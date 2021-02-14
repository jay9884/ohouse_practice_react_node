import React from 'react';
import { withRouter } from "react-router-dom";

class CategoryNav extends React.Component {
  render() {
    const pathname = this.props.location.pathname;
    if(pathname.includes('login') || pathname.includes('signup')) {
      return null;
    }

    return (
      <div className="category-nav">
        <div className="container">
          <ul className="category-nav-wrap">
            <li>스토어</li>
            <li>홈카테고리</li>
            <li>신혼가구</li>
            <li>베스트</li>
            <li>오늘의딜</li>
            <li>연휴특가</li>
            <li>월동준비</li>
            <li>리퍼마켓</li>
            <li>기획전</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(CategoryNav);