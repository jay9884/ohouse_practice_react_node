import React from 'react';
import Icon from '../Icon';

class SearchIsTying extends React.Component {
  render() {
    let { inputValue } = this.props;
    let cutInputValue = inputValue;
    return (
      <li>
        <Icon icon="search" size={14} className="icon-search"/>
        <a href={ inputValue }>
          {(inputValue.length > 13 ? cutInputValue.substring(0, 12) + "...": inputValue)}
        </a>
      </li>
    )
  }
}

export default SearchIsTying;