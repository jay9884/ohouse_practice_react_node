import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Search from './Search';
import Icon from '../Icon';
import Unathorized from './Unauthorized';

class Gnb extends React.Component {
  render() {
    const pathname = this.props.location.pathname;
    if(pathname.includes('login') || pathname.includes('signup')) {
      return null;
    }
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
                <li><a href="/">커뮤니티</a></li>
                <li><a href="/store">스토어</a></li>
                <li><a href="/experts">인테리어시공</a></li>
              </ul>
            </div>

            <div className="gnb-right">
              <div className="search">
                <Search />
              </div>
              <div className="utils">
                <Unathorized />
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