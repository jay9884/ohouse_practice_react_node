import React from 'react';

class SignUpInput extends React.Component {
  state = {
    idValue: '', idChanged: false,
    pwValue: '', pwChanged: false,
    pwValueCheck: '', pwCheckChanged: false,
    nicknameValue: '', nicknameChanged: false
  }

  handleIdOnChange = (e) => {
    let newInputValue = e.currentTarget.value;
    this.setState({ idValue: newInputValue, idChanged: true });
  }

  handlePwOnChange = (e) => {
    let newInputValue = e.currentTarget.value;
    this.setState({ pwValue: newInputValue, pwChanged: true });
  }

  handlePwCheckOnChange = (e) => {
    let newInputValue = e.currentTarget.value;
    this.setState({ pwValueCheck: newInputValue, pwCheckChanged: true });
  }

  handleNicknameOnChange = (e) => {
    let newInputValue = e.currentTarget.value;
    let { nicknameValue } = this.state;
    if(nicknameValue.length < 15) {
      this.setState({ nicknameValue: newInputValue, nicknameChanged: true });
    } else {
      this.setState({ nicknameValue: newInputValue.substring(0, 15) });
    }
  }

  render() {
    let { idValue, pwValue, pwValueCheck, nicknameValue,
          idChanged, pwChanged, pwCheckChanged, nicknameChanged } = this.state;
    // let { filledInputFunc } = this.props;
    
    // if(idValue && pwValue.length >= 8 && (pwValue === pwValueCheck) && nicknameValue.length >= 2 && nicknameValue.length <= 15) {
    //   filledInputFunc({
    //     id: idValue,
    //     pw: pwValue,
    //     nickname: nicknameValue
    //   })
    // }
    
    
    
    return (
      <>
      <div className="sign-up-form-group">
        <h1>아이디</h1>
        <div className="email-input">
          <input type="text" 
                  className="id" 
                  placeholder="아이디"
                  value={ idValue }
                  onChange={ this.handleIdOnChange }/>
        </div>
        {idChanged && !idValue 
        ? <p style={{color:'#ff7777'}}>필수 입력 항목입니다.</p> 
        : null}
      </div>

      <div className="sign-up-form-group">
        <h1>비밀번호</h1>
        <p>8자 이상 입력해주세요.</p>
        <div className="password-input">
          <input type="password" 
                  className="password"
                  placeholder="비밀번호"
                  value={ pwValue }
                  onChange={ this.handlePwOnChange }/>
        </div>
        {pwChanged && !pwValue ?
        <p style={{color:'#ff7777'}}>필수 입력 항목입니다.</p> : 
        null}
        {pwChanged && pwValue.length > 0 && pwValue.length < 8 ?
        <p style={{color:'#ff7777'}}>8자 이상입력해 주세요.</p> : 
        null}
      </div>

      <div className="sign-up-form-group">
        <h1>비밀번호 확인</h1>
        <div className="password-input-check">
          <input type="password" 
                  className="password" 
                  placeholder="비밀번호 확인"
                  value={ pwValueCheck }
                  onChange={ this.handlePwCheckOnChange }/>
        </div>
        {pwCheckChanged && !pwValueCheck ? 
        <p style={{color:'#ff7777'}}>확인을 위해 비밀번호를 한번 더 입력해주세요.</p> : 
        null}
        {pwValueCheck && (pwValue !== pwValueCheck) ? 
        <p style={{color:'#ff7777'}}>비밀번호가 일치하지 않습니다.</p> : 
        null}
      </div>

      <div className="sign-up-form-group">
        <h1>별명</h1>
        <p>다른 유저와 겹치지 않는 별명을 입력해주세요.(2~15자)</p>
        <div className="password-input-check">
          <input type="text" 
                  className="password" 
                  placeholder="별명(2~15자)"
                  value={ nicknameValue }
                  onChange={ this.handleNicknameOnChange }/>
        </div>
        {nicknameChanged && !nicknameValue ?
        <p style={{color:'#ff7777'}}>필수 입력 항목입니다.</p> : 
        null}
        {nicknameValue && (nicknameValue.length < 2) ?
        <p style={{color:'#ff7777'}}>2자 이상 입력해주세요.</p> : 
        null}
      </div>
      </>
    )
  }
}

export default SignUpInput;