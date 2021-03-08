import React from "react";

class ProductDetail extends React.Component {
  render () {
    const {detail} = this.props;
    return(
      <table>
        <tr>
            <td class="table-left">품명 및 모델명</td>
            <td class="table-right">{detail.model_name}</td>
        </tr>
        <tr>
            <td class="table-left">KC 인증 필 유무</td>
            <td class="table-right">{detail.KC_authentication}</td>
        </tr>
        <tr>
            <td class="table-left">정격전압, 소비전력</td>
            <td class="table-right">{detail.power_consumption}</td>
        </tr>
        <tr>
            <td class="table-left">에너지소비효율등급</td>
            <td class="table-right">{detail.energy_effieciency}</td>
        </tr>
        <tr>
            <td class="table-left">동일모델의 출시년월</td>
            <td class="table-right">{detail.release_date}</td>
        </tr>
        <tr>
            <td class="table-left">제조자, 수입품의 경우 수입자를 함께 표기</td>
            <td class="table-right">{detail.company_name}</td>
        </tr>
        <tr>
            <td class="table-left">제조국</td>
            <td class="table-right">{detail.made_by}</td>
        </tr>
        <tr>
            <td class="table-left">크기</td>
            <td class="table-right">{detail.product_size}</td>
        </tr>
        <tr>
            <td class="table-left">추가설치비용</td>
            <td class="table-right">{detail.add_cost}</td>
        </tr>
        <tr>
            <td class="table-left">품질보증기준</td>
            <td class="table-right">{detail.as_period}</td>
        </tr>
        <tr>
            <td class="table-left">A/S 책임자와 전화번호</td>
            <td class="table-right">{detail.company_call}</td>
        </tr>
      </table>
    )
  }
}

export default ProductDetail;