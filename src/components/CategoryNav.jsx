import React from 'react';
import { withRouter } from "react-router-dom";

class CategoryNav extends React.Component {
  state = {
    scrollTop: 0,
    fixed: true
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(prevProps, preveState) {
    const { scrollTop } = this.state;
    if(preveState.scrollTop < scrollTop) {
      this.setState({fixed: false})
    }
    if(preveState.scrollTop > scrollTop) {
      this.setState({fixed: true})
    }
  }

  onScroll = (e) => {
    const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
    this.setState({ scrollTop });
  }

  render() {
    const pathname = this.props.location.pathname;
    if(pathname.includes('login') || pathname.includes('signup')) {
      return null;
    }
    const { fixed } = this.state;

    return (
      <div className={fixed ? "category-nav" : "category-nav not-fixed"}>
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