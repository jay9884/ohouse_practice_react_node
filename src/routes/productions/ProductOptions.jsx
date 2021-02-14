import React from "react";
import OptionList from "./OptionList";
import AddOptionList from './AddOptions';

class ProductOptions extends React.Component {
  state= {
    option_arr: [],
    add_option_arr: []
  }

  handleOnChange = (e) => {
    const { option_arr } = this.state;
    const newArr = [...option_arr];
    if(newArr.includes(e.target.value)){
      alert('이미 선택한 옵션입니다.');
      return
    }

    newArr.push(e.target.value);
    this.setState({ option_arr: newArr });
  }

  handleAddOnChange = (e) => {
    const { option_arr, add_option_arr } = this.state;
    const newArr = [...add_option_arr];

    if(option_arr.length === 0) {
      alert('옵션을 먼저 선택해주시길 바랍니다.');
      return
    }

    if(newArr.includes(e.target.value)){
      alert('이미 선택한 옵션입니다.');
      return
    }

    newArr.push(e.target.value);
    this.setState({ add_option_arr: newArr });
  }

  render () {
    const { add_option, option } = this.props;
    const { option_arr, add_option_arr } = this.state;
    console.log(this.props);
    return(
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
                <OptionList option={option} idNum={v}/>
              ))}
              {add_option_arr.map((v) => (
                <AddOptionList addoption={add_option} idNum={v}/>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default ProductOptions;