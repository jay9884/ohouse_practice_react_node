import React from 'react';
import Icon from './Icon';
import PagingNumber from './PagingNumber';

class Paging extends React.Component {
  state = {
    pagingArr: []
  }

  handlePrevArrowButton = () => {
    const { handlePagingPrevArrow } = this.props;
    handlePagingPrevArrow();
  }

  handleNextArrowButton = () => {
    const { handlePagingNextArrow } = this.props;
    handlePagingNextArrow();
  }

  componentDidMount() {
    const { pagingAmount } = this.props;
    const { pagingArr } = this.state;

    let newPagingArr = [...pagingArr];
    for(let i = 1; i <= Math.ceil(pagingAmount / 5); i++) {
      newPagingArr.push(i);
    }

    this.setState({pagingArr: newPagingArr});
  }

  render() {
    const { handlePagingNumber, pagingNumber } = this.props;
    const { pagingArr } = this.state;
    return (
      <ul className="paging-wrap">
        <li>
          <button 
            class="paging-arrow paging-left" 
            type="button"
            onClick={this.handlePrevArrowButton}>
            <Icon icon="chevron" size={10} color="#1B1C32" />
          </button>
          {pagingArr.map((v) => 
            <PagingNumber 
              pagingNumber={pagingNumber}
              pagingCount={v} 
              handlePagingNumber={handlePagingNumber}/>)}
          <button 
            class="paging-arrow paging-right" 
            type="button"
            onClick={this.handleNextArrowButton}>
            <Icon icon="chevron" size={10} color="#1B1C32" />
          </button>
        </li>
      </ul>
    )
  }
}

export default Paging;