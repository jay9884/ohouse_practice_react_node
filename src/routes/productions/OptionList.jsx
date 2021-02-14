import React from 'react';
import Icon from '../../components/Icon';

class OptionList extends React.Component {
  state = {
    option_count: 1
  }

  handleOnChange = (e) => {
    this.setState({option_count: e.target.value});
  }

  render() {
    const { idNum, option } = this.props;
    const temp = option.filter((v) => v.op_id === Number(idNum));
    const {op_title, op_price, op_dc_price } = temp[0];
    const {option_count} = this.state

    return (
      <div className="option-wrap">
        <div className="option-wrap-top">
          <span className="option-title">{op_title}</span>
          <button className="option-close">
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
            {!op_dc_price
              ? (op_price * option_count).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : (op_dc_price * option_count).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}<span>원</span>
          </span>
        </div>
      </div>
    )
  }
}

export default OptionList;