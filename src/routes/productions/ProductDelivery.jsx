import React from 'react';

class ProductDelivery extends React.Component {
  render() {
    const {delivery} = this.props;
    return (
      <>
      <div className="production-selling-delivery-wrap">
        <div className="production-selling-delivery">
          <h1>배송</h1>
        </div>
        <table>
          <tr>
              <td className="table-left">배송</td>
              <td className="table-right">{delivery.delivery}</td>
          </tr>
          <tr>
              <td className="table-left">택배비</td>
              <td className="table-right">{delivery.delivery_fee}</td>
          </tr>
          <tr>
              <td className="table-left">배송불가 지역</td>
              <td className="table-right">{delivery.delivery_not}</td>
          </tr>
        </table>
      </div>
      <div className="production-selling-delivery-wrap">
        <div className="production-selling-delivery">
          <h1>교환/환불</h1>
        </div>
        <table>
          <tr>
              <td className="table-left">반품배송비</td>
              <td className="table-right">{delivery.refund_fee}</td>
          </tr>
          <tr>
              <td className="table-left">교환배송비</td>
              <td className="table-right">{delivery.exchange_fee}</td>
          </tr>
          <tr>
              <td className="table-left">보내실 곳</td>
              <td className="table-right">{delivery.address}</td>
          </tr>
        </table>
      </div>
      </>
    )
  }
}

export default ProductDelivery;