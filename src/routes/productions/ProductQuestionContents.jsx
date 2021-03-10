import React from 'react';

class ProductQuestionContents extends React.Component {
  render() {
    const { kindOfQuestion, nickname, createdAt, contents } = this.props;
    return (
      <div className="product-question-contents">
        <div className="product-question-contents-top">
          <span className="product-question-category">
            구매 | {kindOfQuestion} | 미답변
          </span>
          <span>{nickname} | {createdAt}</span>
        </div>
        <div className="product-question-contents-bottom">
          <span>Q</span>
          <p>{contents}</p>
        </div>
      </div>
    )
  }
}

export default ProductQuestionContents;