import React from 'react';

class ProductFooter extends React.Component {
  render() {
    return (
      <div className="product-page-footer-content">
        <div className="product-page-footer-content-top">
          <h1>고객센터</h1>
          <h2>1004-1004</h2>
          <p>평일 09:00 ~ 18:00 (주말 & 공휴일 제외)</p>
        </div>
        <div className="prodcut-page-footer-content-bottom">
          <p>상호명 : 버그가 너무 많아 김버그    이메일(고객문의) kimbugx@gmail.com (제휴문의) kimbugx@gmail.com    대표이사 : 김버그</p>
          <p>주소 : 서울 서초구</p>
        </div>
    </div>
    )
  }
}

export default ProductFooter;