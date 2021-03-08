import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Login extends React.Component {
  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    if(!e.target[0].value) {
      alert('아이디를 입력해주세요');
      return
    }
    if(!e.target[1].value) {
      alert('비밀번호를 입력해주세요');
      return
    }

    // let { history: { push }} = this.props;

    axios.post('http://localhost:3003/api/user/login', {
      id : e.target[0].value,
      pw : e.target[1].value
    }).then((response) => {
      console.log(response);
      const {data: { token }} = response;
      const {data: { expired }} = response;
      localStorage.setItem("authorization", token);
      localStorage.setItem("expired", expired);
      console.log(localStorage);
      axios.defaults.headers.common["_token_"] = token;
      // push('/');
      window.location.replace("/");
    }).catch(error => { 
      const { data: { message }} = error.response;
      console.log('error : ',error.response);
      alert(message);
    });
  }

  componentDidMount() {
    localStorage.removeItem("authorization");
    localStorage.removeItem("expired");
    axios.defaults.headers.common["_token_"] = '';
  }

  render() {
    return (
      <section className="login-page">
        <div className="container">
          <div className="login-page-wrap">
            <div className="page-logo">
              <Link to="/store" >
                <img src="./logo.svg" alt="내일의 집"/>
              </Link>
            </div>
            <form onSubmit={this.handleOnSubmit}>
              <div className="input-id-pw">
                <input type="text" placeholder="아이디"/>
                <input type="password" placeholder="비밀번호"/>
              </div>
              <button type="submit" className="button login-button">
                로그인
              </button>
            </form>
            <div className="login-action">
              <span>
                <Link to="/signup">회원가입</Link>
              </span>
            </div>
            <div className="login-sns">
              <p>sns계정으로 간편 로그인/회원가입</p>
              <ul className="kind-of-sns">
                <li>
                  <a href="/facebook">
                    <img src="./sns_login/facebook_logo.jpg" alt=""/>
                  </a>
                </li>
                <li>
                  <a href="/kakaotalk">
                    <img src="./sns_login/kakaotalk_logo.jpg" alt=""/>
                  </a>
                </li>
                <li>
                  <a href="/naver">
                    <img src="./sns_login/naver_logo.png" alt=""/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Login;