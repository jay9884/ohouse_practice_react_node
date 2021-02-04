import React from "react";
import { Link } from 'react-router-dom';
import Icon from '../Icon';

class Unauthorized extends React.Component {
  state = {
    isHover: false
  }

  handleOnMoseOver = () => {
    this.setState({ isHover: true });
  }

  handleOnMouseLeave = () => {
    this.setState({ isHover: false });
  }

  render() {
    const { isHover } = this.state;
    return (
      <div className="unauthorized">
      <div className="unauthorized-cart-wrap"
            onMouseOver={this.handleOnMoseOver}
            onMouseLeave={this.handleOnMouseLeave}>
        <Icon className="unauthorized-cart" 
              icon="cart" 
              size={24} 
              color={isHover ? "#ffffff" : "#858896"}/>
      </div>
      <span className="utils-login"><Link to="/login">로그인</Link></span>
      <span className="utils-sign-up"><Link to="/signup">회원가입</Link></span>
    </div>
    )
  }
}

export default Unauthorized;