import React from "react";
import axios from 'axios';
import { withRouter } from "react-router";
import Paging from "../../components/Paging";
import WritingQuestion from "./WritingQuestion";
import ProductQuestionContents from "./ProductQuestionContents";

class ProductQuestion extends React.Component {
  state = {
    loading: true,
    question: null,
    questionCount: 0,
    pagingNumber: 1
  }

  handlePagingPrevArrow = () => {
    const { pagingNumber } = this.state;
    if(pagingNumber <= 1) {
      return null;
    }

    let newPagingNumber = pagingNumber - 1;
    this.setState({pagingNumber: newPagingNumber});
  }

  handlePagingNextArrow = () => {
    const { pagingNumber } = this.state;
    const { reviewArr } = this.props;
    console.log(Math.ceil(reviewArr.length / 5));
    
    if(pagingNumber >= Math.ceil(reviewArr.length / 5)) {
      return null;
    }

    let newPagingNumber = pagingNumber + 1;
    this.setState({pagingNumber: newPagingNumber});
  }

  handlePagingNumber = (e) => {
    this.setState({pagingNumber: e.target.value})
  }

  async componentDidMount() {
    const pathname = this.props.location.pathname;
    try {
      const {data: {question}} = await axios.get(`http://localhost:3003/api/question${pathname}`);
      this.setState({
        question: question.rows,
        questionCount: question.total
      });
    } catch(err) {
      console.error(err);
    } finally {
      this.setState({loading: false})
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { pagingNumber } = this.state;
    if(prevState.pagingNumber !== pagingNumber) {
      const pathname = this.props.location.pathname;
      try {
        const {data: {question}} = await axios.get(`http://localhost:3003/api/question${pathname}?page=${pagingNumber}&pagSize=5`);
        this.setState({
          question: question.rows,
          questionCount: question.total
        });
      } catch(err) {
        console.error(err);
      }
    }
  }

  render() {
    const { question, questionCount, loading, pagingNumber } = this.state;

    return (
      <>
      { loading
        ? null
        : <div>
            <div className="product-question-title">
              <h1 className="production-selling-question">
                    문의<span>{questionCount}</span>
              </h1>
              <WritingQuestion />
            </div>
            {question.map((v) => 
              <ProductQuestionContents 
                kindOfQuestion={v.kind_of_question}
                nickname={v.nickname}
                createdAt={v.created_at}
                contents={v.contents}/>)}

            <Paging 
              pagingNumber={pagingNumber}
              pagingAmount={questionCount}
              handlePagingPrevArrow={this.handlePagingPrevArrow}
              handlePagingNextArrow={this.handlePagingNextArrow}
              handlePagingNumber={this.handlePagingNumber}/>
          </div>
      }
      </>
    )
  }
}

export default withRouter(ProductQuestion);