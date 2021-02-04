import React from "react";
import { Link } from 'react-router-dom';

class Agreement extends React.Component {
  state = {
    clicked: false,
    ageChecked: false,
    usePolicyChecked: false,
    privacyChecked: false,
    commercialChecked: false
  }

  handleAllOnChange = (e) => {
    this.setState({ clicked: true });
    this.setState({ 
      ageChecked: e.currentTarget.checked,
      usePolicyChecked: e.currentTarget.checked,
      privacyChecked: e.currentTarget.checked,
      commercialChecked: e.currentTarget.checked
    });
  }

  handleAgeOnChange = (e) => {
    this.setState({ageChecked: e.currentTarget.checked, clicked: true});
  }

  handleUseOnChange = (e) => {
    this.setState({usePolicyChecked: e.currentTarget.checked, clicked: true});
  }

  handlePrivacyOnChange = (e) => {
    this.setState({privacyChecked: e.currentTarget.checked, clicked: true});
  }

  handleCommercialOnChange = (e) => {
    this.setState({commercialChecked: e.currentTarget.checked});
  }

  render() {
    let {clicked, ageChecked, usePolicyChecked, privacyChecked, commercialChecked} = this.state;
    let { agreementFunc } = this.props;

    if(ageChecked && usePolicyChecked && privacyChecked) {
      commercialChecked 
      ? agreementFunc({ commercial: 1 })
      : agreementFunc({ commercial: 0 })
    }


    return (
      <div className="agreement">
        <h1 className="agreement-title">약관동의</h1>
        <div className="agreement-wrap">
          <div className="agreement-all">
            <input className="agreement-checkbox-all" 
                    type="checkbox"
                    checked={
                      (ageChecked && usePolicyChecked && privacyChecked && commercialChecked)
                      ? true
                      : false
                    }
                    onChange={this.handleAllOnChange}/>
            <span>전체동의</span>
          </div>

          <div className="agreement-list">
            <div className="agreement-list-item">
              <input className="agreement-checkbox-age" 
                      type="checkbox"
                      checked={ageChecked}
                      onChange={this.handleAgeOnChange}/>
              <span>만 14세 이상입니다.<span className="agreement-requirement">(필수)</span></span>
            </div>

            <div className="agreement-list-item">
              <input className="agreement-checkbox-usepolicy" 
                      type="checkbox"
                      checked={usePolicyChecked}
                      onChange={this.handleUseOnChange}/>
              <span className="agreement-usepolicy"><Link to="/usepolicy">이용약관<span className="agreement-requirement">(필수)</span></Link></span>
            </div>

            <div className="agreement-list-item">
              <input className="agreement-checkbox-privacy" 
                      type="checkbox"
                      checked={privacyChecked}
                      onChange={this.handlePrivacyOnChange}/>
              <span className="agreement-privacy"><Link to="/privacy">개인정보처리방침<span className="agreement-requirement">(필수)</span></Link></span>
            </div>

            <div className="agreement-list-item">
              <input className="agreement-checkbox-marketing" 
                      type="checkbox"
                      checked={commercialChecked}
                      onChange={this.handleCommercialOnChange}/>
              <span>이벤트, 프로모션 알림 메일 및 SMS 수신<span className="agreement-choice">(선택)</span></span>
            </div>
          </div>
        </div>
        {!clicked || (ageChecked && usePolicyChecked && privacyChecked) ?
        null:
        <p style={{color:'#ff7777', fontSize:'12px'}}>필수 동의 항목을 체크해주세요.</p>}
      </div>
    )
  }
}

export default Agreement;