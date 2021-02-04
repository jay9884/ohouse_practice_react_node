import React from 'react';
import Icon from '../Icon';

class SearchList extends React.Component {
  handleOnclick = () => {
		const { item, deleteHistories } = this.props;
		deleteHistories(item.createdAt);
	}

  render() {
    const { item } = this.props;
    return (
      <li className="search-list-item">
        <a href={"/"+ item.content}>{ item.content }</a>
        <button onClick={this.handleOnclick}>
          <Icon icon="close" size={14} color="#858896"/>
        </button>
      </li>
    )
  }
}

export default SearchList;