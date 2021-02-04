import React from 'react';
import Icon from '../Icon';
import SearchIsTying from './SearchIsTyping';
import SearchList from './SearchList';

class Search extends React.Component {
  state = {
    inputValue: '',
    clicked: false,
    typing: false,
    do_not_blur: false,
    search_histories: []
  }

  //입력 시 입력 ul 표출, 검색기록 ul 보이지 않음
  isTyping = (e) => {
    let newInputValue = e.currentTarget.value;
    this.setState({ inputValue: newInputValue, typing: true, clicked: false });
  }

  //입력 후 엔터 눌렀을 때 검색기록 배열에 담음
  handleOnKeyDown = (e) => {
    const { search_histories } = this.state;

    if(e.keyCode !==13) return
    const new_search_histories = [...search_histories];

    //검색기록이 5개를 초과할 경우 가장 첫번째 요소 지움
    if(new_search_histories.length > 4) {
      new_search_histories.shift();
    }

    //동일한 검색기록이 있으면 이전 검색어 삭제
    new_search_histories.forEach((v, i) => {
      if(v.content === e.currentTarget.value) {
        new_search_histories.splice(i, 1);
        console.log(new_search_histories);
      } 
    })

    //검색어 검색 기록 배열에 담음
    if(e.currentTarget.value.length === 0) {
      return
    } else {
      new_search_histories.push({
        createdAt: Date.now(),
        content: e.currentTarget.value, 
        close: false,
      });
      this.setState({ search_histories: new_search_histories, typing: false});

      // document.location.href = `http://localhost:3000/productions/${e.currentTarget.value}`
      console.log(new_search_histories);
    }
  }

  //close 버튼 클릭 시 검색어 검색기록 배열에서 지움
  deleteHistories = (createdAt) => {
    const { search_histories } = this.state;

    const new_search_histories = 
      [...search_histories].filter((v) => v.createdAt !== createdAt);

    this.setState({ search_histories: new_search_histories });
  }

  //전체 삭제 버튼 클릭 시 검색기록 배열 초기화
  deleteAllHistories = () => {
    this.setState({ search_histories: [] });
  }

  handleOnClick = (e) => {
    if(e.currentTarget.value.length === 0) {
      this.setState({ clicked: true });
    } else {
      return
    }
  }

  //검색기록 ul 클릭 시 blur 막기위한 state -> 수정필요
  preventOnBlur = () => {
    this.setState({ do_not_blur: true });
    console.log('blur 금지');
  }

  handleOnBlur = () => {
    let { do_not_blur } = this.state;
    console.log('blur할거지롱');
    console.log(do_not_blur);
    if(!do_not_blur) {
      this.setState({ clicked: false });
    } else {
      return
    }
  }

  render() {
    let { inputValue, clicked, typing, search_histories } = this.state;
    return (
      <div className="search-wrap">
        <Icon size={20} icon="search" className="icon-search"/>
        <input 
          className="search-input" 
          type="text" 
          placeholder="스토어검색" 
          value={ inputValue }
          onChange={ this.isTyping }
          onClick={ this.handleOnClick }
          onKeyDown={ this.handleOnKeyDown }/>

          <ul className={(inputValue && typing ? "search-is-typing-wrap show": "search-is-typing-wrap")}>
            <SearchIsTying inputValue={ inputValue } />
          </ul>
          
          <ul className={clicked && search_histories.length ? "search-list show": "search-list"}>
            <div className="search-list-header">
              <span>최근 검색어</span>
              <button type="button" onClick={this.deleteAllHistories}>전체삭제</button>
            </div>
            {search_histories.reverse().map((v) => 
              <SearchList 
                item={v} 
                key={v.createdAt} 
                deleteHistories={this.deleteHistories}/>
            )}
          </ul>
          
      </div>
    )
  }
}

export default Search;