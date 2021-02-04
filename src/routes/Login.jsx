import React from 'react';
import { Link } from "react-router-dom";

class Login extends React.Component {
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
            <form action="localhost:3001/api/user/login" method="POST">
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