import React from 'react';

class PagingNumber extends React.Component {
  handleOnClick = (e) => {
    const { handlePagingNumber } = this.props;
    handlePagingNumber(e);
  }

  render() {
    const { pagingCount, pagingNumber } = this.props;
    return (
      <li>
        <button 
          class={(parseInt(pagingNumber) === parseInt(pagingCount)) ? "paging-number clicked" : "paging-number" }
          type="button"
          value={pagingCount}
          onClick={this.handleOnClick}>
            {pagingCount}
        </button>
      </li>
    )
  }
}

export default PagingNumber;