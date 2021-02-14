import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Search from './Search';
import Icon from '../Icon';
import Unathorized from './Unauthorized';
import Authorized from './Authorized';
import axios from 'axios';

class Gnb extends React.Component {
  state = {
    loading: true,
    loggedIn: false,
    user_nickname: ''
  }

  async componentDidMount() {
    const token = localStorage.getItem("authorization");
    console.log('토큰 찾아랏!', token);
    if(token) {
      try {
        axios.defaults.headers.common["_token_"] = token;
        console.log('헤더에 토큰 찾는데 에러는 없음');
      } catch(err) {
        console.error(err);
      }
      try {
        await axios.get('http://localhost:3001/api/user/check_token')
          .then((response) => {
            console.log(response);
            const { data: { nickname }} = response;
            console.log(nickname);
            this.setState({loggedIn: true, user_nickname: nickname});
          }).catch(error => {
            console.error(error);
          }).finally(() => {
            this.setState({ loading: false });
          });
      } catch(err) {
        console.error(err);
      }
    } else {
      return
    }
  }

  render() {
    const pathname = this.props.location.pathname;
    if(pathname.includes('login') || pathname.includes('signup')) {
      return null;
    }

    let { loggedIn } = this.state;
    console.log(this.state);

    return (
      <div className="gnb">
        <div className="container">
          <div className="gnb-wrap">
            <div className="gnb-left">
              <div className="page-logo">
                <Link to="/">
                <img src="/logo.svg" alt="내일의 집" className="page-logo-image"/>
                </Link>
              </div>
              <ul className="nav-menu">
                <li><Link to="/">커뮤니티</Link></li>
                <li><Link to="/">스토어</Link></li>
                <li><Link to="/">인테리어시공</Link></li>
              </ul>
            </div>

            <div className="gnb-right">
              <div className="search">
                <Search />
              </div>
              <div className="utils">
                {loggedIn ? <Authorized />: <Unathorized />}
              </div>
              <button type="button" className="button">
                글쓰기
                <Icon icon="chevron" size={9} color="#ffffff"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Gnb);