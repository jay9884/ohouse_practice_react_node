import React from "react";
import OptionList from "./OptionList";
import AddOptionList from './AddOptions';
// import TotalPrice from "./TotalPrice";

class ProductOptions extends React.Component {
  state= {
    option_arr: [],
    add_option_arr: []
  }

  addTotalPrice = (total) => {
    console.log(total);
    return total;
  }

  handleOnChange = (e) => {
    const { option_arr } = this.state;
    const newArr = [...option_arr];
    if(newArr.includes(e.target.value)){
      e.target.value = '선택';
      alert('이미 선택한 옵션입니다.');
      return
    }

    newArr.push(e.target.value);
    this.setState({ option_arr: newArr });
    e.target.value = '선택';
  }

  handleAddOnChange = (e) => {
    const { option_arr, add_option_arr } = this.state;
    const newArr = [...add_option_arr];

    if(option_arr.length === 0) {
      e.target.value = '추가상품 (선택)';
      alert('옵션을 먼저 선택해주시길 바랍니다.');
      return
    }

    if(newArr.includes(e.target.value)){
      e.target.value = '추가상품 (선택)';
      alert('이미 선택한 옵션입니다.');
      return
    }

    newArr.push(e.target.value);
    this.setState({ add_option_arr: newArr });
    e.target.value = '추가상품 (선택)';
  }

  //close 버튼 클릭 시 옵션 배열에서 지움
  deleteOption = (idNum) => {
    const { option_arr } = this.state;

    const newArr = 
      [...option_arr].filter((v) => v !== idNum);

    this.setState({ option_arr: newArr });
  }

  //close 버튼 클릭 시 추가 옵션 배열에서 지움
  deleteAddOption = (idNum) => {
    const { add_option_arr } = this.state;

    const newArr = 
      [...add_option_arr].filter((v) => v !== idNum);

    this.setState({ add_option_arr: newArr });
  }

  render () {
    const { add_option, option } = this.props;
    const { option_arr, add_option_arr } = this.state;
    
    return(
      <>
      <div className="product-index-options-wrap">
        { option && (
          <select className="product-index-option-input"
                  onChange={this.handleOnChange}>
            <option selected disabled>선택</option>
            { option.map((v) => (
            <option 
              key={`${v.pro_id}of${v.op_id}`} 
              value={v.op_id}>
              {`${v.op_title}
                (${v.op_dc_price 
                ? v.op_dc_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") 
                : v.op_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") }원)`}
            </option>
            ))}
          </select>
        )}
        { add_option && (
          <select className="product-index-add-option-input"
                  onChange={this.handleAddOnChange}>
            <option selected disabled>추가상품 (선택)</option>
            { add_option.map((v) => (
            <option 
              key={`${v.pro_id}of${v.add_op_id}`} 
              value={v.add_op_id}>
              {`${v.add_op_title}
                (${v.add_op_dc_price 
                ? v.add_op_dc_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") 
                : v.add_op_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") }원)`}
            </option>
            ))}
          </select>
        ) }

        <div className="selected-option">
          {option_arr && (
            <div className="selected-option-list">
              {option_arr.map((v) => (
                <OptionList 
                  option={option} 
                  idNum={v} 
                  deleteOption={this.deleteOption}
                  addTotalPrice={this.addTotalPrice}/>
              ))}
            
              {add_option_arr.map((v) => (
                <AddOptionList 
                  addoption={add_option} 
                  idNum={v} 
                  deleteAddOption={this.deleteAddOption}
                  addTotalPrice={this.addTotalPrice}/>
              ))}
            </div>
          )}
          
        </div>
      </div>
      <div className="cart-total-price">
        <span className="text">주문금액</span>
        <span>{() => this.addTotalPrice()}원</span>
      </div>
      <div className="buttons">
        <button className="button big reverse">
          장바구니
        </button>
        <button className="button big">
          바로구매
        </button>
      </div>
      </>
    )
  }
}

export default ProductOptions;