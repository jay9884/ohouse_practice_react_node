import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SignUpInput from './SignUpInput';
import Agreement from './Agreement';

class SignUp extends React.Component {
  handleOnSubmit = (e) => {
    e.preventDefault();
    if(!e.target[0].value) {
      alert('아이디를 입력해주세요.');
      return
    }
    if(e.target[1].value.length < 8) {
      alert('비밀번호를 8자 이상입력해주세요');
      return
    }
    if(e.target[1].value !== e.target[2].value) {
      alert('비밀번호가 일치하지 않습니다');
      return
    }
    if(e.target[3].value.length > 15 || e.target[3].value.length < 2) {
      alert('닉네임을 2자 이상 15자 이하로 입력해주세요.');
      return
    }
    if(!(e.target[5].checked && e.target[6].checked && e.target[7].checked)) {
      alert('필수 동의 항목을 체크해주세요.');
      return
    }

    let { history: { push } } = this.props;

    axios.post('http://localhost:3003/api/user/signup', {
      id : e.target[0].value,
      pw : e.target[1].value,
      nickname: e.target[3].value,
      commercial: e.target[8].checked ? 1 : 0
    }).then((response) => {
      console.log(response);
      push('/login');
    }).catch(error => { 
      const { data: { message }} = error.response;
      console.log('error : ',error.response);
      alert(message);
    });
  }

  // filledInputFunc = (new_user) => {
  //   console.log(new_user);
  // }

  // agreementFunc = (checked) => {
  //   console.log(checked);
  // }

  render() {
    return (
      <section className="sign-up-page">
        <div className="container sign-up-page-logo">
          <div className="page-logo">
            <Link to="/store" >
              <img src="./logo.svg" alt="내일의 집"/>
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="sign-up-page-wrap">
            <h1 className="sign-up-page-title">회원가입</h1>
            <div className="sign-up-sns">
              <p>sns계정으로 간편하게 회원가입</p>
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

            <form className="sign-up-form"
                  onSubmit={this.handleOnSubmit}>
              <SignUpInput />
              <Agreement />

              <button 
                className="button sign-up-submit"
                onSubmit={() => this.handleOnSubmit}>
                    회원가입 완료
              </button>
              
            </form>
            <p className="sign-up-sign-in">
              이미 아이디가 있으신가요? 
              <span><Link to="/login">로그인</Link></span>
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export default SignUp;