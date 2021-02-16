import React from 'react';
import Icon from '../../components/Icon';

class OptionList extends React.Component {
  state = {
    option_count: 1
  }

  handleOnChange = (e) => {
    this.setState({option_count: e.target.value});
  }

  handleOnClick = (e) => {
    const { idNum, deleteOption } = this.props;
    deleteOption(idNum);
  }

  render() {
    const { idNum, option, addTotalPrice } = this.props;
    const temp = option.filter((v) => v.op_id === Number(idNum));
    const {op_title, op_price, op_dc_price } = temp[0];
    const {option_count} = this.state;

    // (!op_dc_price)
    //   ? addTotalPrice({op: [idNum, op_price * option_count]})
    //   : addTotalPrice({op: [idNum, op_dc_price * option_count]})

    (!op_dc_price)
      ? addTotalPrice(op_price * option_count)
      : addTotalPrice(op_dc_price * option_count)
    return (
      <div className="option-wrap">
        <div className="option-wrap-top">
          <span className="option-title">{op_title}</span>
          <button className="option-close"
                  onClick={this.handleOnClick}>
            <Icon icon="close" size={11} color="#858896"/>
          </button>
        </div>
        <div className="option-wrap-bottom">
          <div className="option-count">
            <select onChange={this.handleOnChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <span className="option-total-price">
            <span className="option-total-price-value">{!op_dc_price
              ? (op_price * option_count).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : (op_dc_price * option_count).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span>원
          </span>
        </div>
      </div>
    )
  }
}

export default OptionList;