import React from 'react';

class ProductTab extends React.Component {

  render() {
    return (
      <div className="product-tab-wrap">
        <div className="container">
          <ul>
            <li><a href="#">상품정보</a></li>
            <li><a href="#">리뷰</a></li>
            <li><a href="#">문의</a></li>
            <li><a href="#">배송/환불</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default ProductTab;