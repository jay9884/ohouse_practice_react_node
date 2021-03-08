import React from 'react';
import ReactDOM from 'react-dom';

class ProductTab extends React.Component {
  state = {
    scrollTop: 0,
    fixed: false,
    bottomFixed: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.onScroll);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const top = ReactDOM.findDOMNode(this.refs["position"]).getBoundingClientRect().top;
    const { scrollTop } = this.state;

    if(top < 81 && prevState.scrollTop < scrollTop) {
      return {fixed: true, bottomFixed: false};
    }
    if(top < 81 && prevState.scrollTop > scrollTop) {
      return {fixed: true, bottomFixed: true};
    }
    if(top > 81 && prevState.scrollTop < scrollTop) {
      return {fixed: false, bottomFixed: false};
    }
    if(top > 81 && prevState.scrollTop > scrollTop) {
      return {fixed: false, bottomFixed: false};
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(snapshot) {
      if(snapshot.fixed !== undefined && snapshot.bottomFixed !== undefined) {
        this.setState({fixed: snapshot.fixed, bottomFixed: snapshot.bottomFixed});
      }
    }
  }

  onScroll = (e) => {
    const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
    this.setState({ scrollTop });
  }

  render() {
    const { reviewCount } = this.props;
    const { fixed, bottomFixed } = this.state;
    return (
      <>
      <div className={
        fixed 
        ? (bottomFixed
            ? "product-tab-wrap fixed bottom-fixed"
            : "product-tab-wrap fixed")
        : "product-tab-wrap"}>
        <div className="container">
          <ul>
            <li><a href="#production-selling-information">상품정보</a></li>
            <li><a href="#production-selling-review">리뷰<span>{reviewCount}</span></a></li>
            <li><a href="#production-selling-qestion">문의</a></li>
            <li><a href="#production-selling-delivery">배송/환불</a></li>
          </ul>
        </div>
      </div>
      <div className="find-position" ref="position">

      </div>
      </>
    )
  }
}

export default ProductTab;