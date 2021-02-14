import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Icon from '../Icon';

class Authorized extends React.Component {
  state = {
    bm_isHover: false,
    bell_isHover: false,
    cart_isHover: false,
    profile_clicked: false
  }

  handleBmOnMoseOver = () => {
    this.setState({ bm_isHover: true });
  }

  handleBmOnMouseLeave = () => {
    this.setState({ bm_isHover: false });
  }

  handleBellOnMoseOver = () => {
    this.setState({ bell_isHover: true });
  }

  handleBellOnMouseLeave = () => {
    this.setState({ bell_isHover: false });
  }

  handleCartOnMoseOver = () => {
    this.setState({ cart_isHover: true });
  }

  handleCartOnMouseLeave = () => {
    this.setState({ cart_isHover: false });
  }

  handleOnClick = () => {
    this.setState({ profile_clicked: true });
  }

  handleLogout = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("expired");
    axios.defaults.headers.common["_token_"] = '';
    window.location.replace("/");
  }

  render() {
    const { bm_isHover, bell_isHover, cart_isHover, profile_clicked } = this.state;
    return (
      <div className="authorized">
        <div className="authorized-bookmark-wrap"
              onMouseOver={this.handleBmOnMoseOver}
              onMouseLeave={this.handleBmOnMouseLeave}>
          <Link to="/:id/bookmark">
          <Icon className="authorized-bookmark" 
                icon="bookmark" 
                size={24} 
                color={bm_isHover ? "#ffffff" : "#858896"}/>
          </Link>
        </div>
        <div className="authorized-bell-wrap"
              onMouseOver={this.handleBellOnMoseOver}
              onMouseLeave={this.handleBellOnMouseLeave}>
          <Link to="/:id/bell">
          <Icon className="authorized-bell" 
                icon="bell" 
                size={24} 
                color={bell_isHover ? "#ffffff" : "#858896"}/>
          </Link>
        </div>
        <div className="authorized-cart-wrap"
              onMouseOver={this.handleCartOnMoseOver}
              onMouseLeave={this.handleCartOnMouseLeave}>
          <Link to="/:id/cart">
          <Icon className="authorized-cart" 
                icon="cart" 
                size={24} 
                color={cart_isHover ? "#ffffff" : "#858896"}/>
          </Link>
        </div>
        <div className={profile_clicked ? "user-profile-img show" : "user-profile-img"}>
          <button onClick={this.handleOnClick}>
            <img src="/sns_login/icon-default-user.svg" alt=""/>
          </button>
          <ul className={profile_clicked ? "user-modal show" : "user-modal"}>
            <li><Link to="/">마이페이지</Link></li>
            <li><Link to="/">나의 쇼핑</Link></li>
            <li><Link to="/">이벤트</Link></li>
            <li onClick={this.handleLogout}>로그아웃</li>
          </ul>
        </div>
    </div>
    )
  }
}

export default Authorized;