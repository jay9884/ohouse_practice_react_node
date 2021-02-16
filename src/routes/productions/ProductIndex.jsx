import React from "react";

class ProductIndex extends React.Component {
  render () {
    const {item: { com_name, pro_title, pro_price, pro_dc_price, pro_deliv, pro_deliv_fee }} = this.props;
    const pretty_price = pro_price.toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    const pretty_dc_price = pro_dc_price.toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    return(
      <div className="product-index">
        <span className="product-index-com-name">{ com_name }</span>
        <h1 className="product-index-title">{ pro_title }</h1>
        { !pro_dc_price && <div className="product-index-only-price-wrap">
          <span className="product-index-price">
            { pro_price }
            <span>원</span>
          </span>
        </div>}
        { pro_dc_price && <div className="product-index-price-wrap">
          <span className="product-index-dc-percent">
            { parseInt((pro_price - pro_dc_price) / pro_price * 100)}
            <span>%</span>
          </span>
          <div className="product-index-prices">
            <span className="product-index-price-with-dc">
              { pretty_price }
              <span>원</span>
            </span>
            <span className="product-index-dc-price">
              { pretty_dc_price }
              <span>원</span>
              <span className="product-has-dc">특가</span>
            </span>
          </div>
        </div>}
        <div className="product-index-point">
          <span className="product-index-point-num">987P</span>
          적립해드립니다. (VIP 3배 혜택 적용됨)
        </div>
        <div className="product-index-delivery-wrap">
          <span className="product-index-delivery">{pro_deliv}</span>
          <span className="product-index-delivery-fee">{pro_deliv_fee}</span>
        </div>
      </div>
    )
  }
}

export default ProductIndex;