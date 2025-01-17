import React from 'react';
import Icon from '../../components/Icon';

class AddOptionList extends React.Component {
  state = {
    option_count: 1
  }

  handleOnChange = (e) => {
    this.setState({option_count: e.target.value});
  }

  handleOnClick = (e) => {
    const { idNum, deleteAddOption } = this.props;
    deleteAddOption(idNum);
  }

  render() {
    const { idNum, addoption, addTotalPrice } = this.props;
    const temp = addoption.filter((v) => v.add_op_id === Number(idNum));
    const {add_op_title, add_op_price, add_op_dc_price } = temp[0];
    const {option_count} = this.state;

    // (!add_op_dc_price)
    //   ? addTotalPrice({add: [idNum, add_op_price * option_count]})
    //   : addTotalPrice({add: [idNum, add_op_dc_price * option_count]})

    // (!add_op_dc_price)
    //   ? addTotalPrice(add_op_price * option_count)
    //   : addTotalPrice(add_op_dc_price * option_count)

    return (
      <div className="option-wrap">
        <div className="option-wrap-top">
          <span className="option-title">{add_op_title}</span>
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
            <span className="option-total-price-value">{!add_op_dc_price
              ? (add_op_price * option_count).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : (add_op_dc_price * option_count).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span>원
          </span>
        </div>
      </div>
    )
  }
}

export default AddOptionList;