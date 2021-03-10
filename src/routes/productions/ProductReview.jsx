import React from "react";
import axios from 'axios';
import Paging from "../../components/Paging";
import ProductReviewBottom from "./ProductReviewBottom";
import ProductReviewTop from "./ProductReviewTop";
import WritingReview from "./WritingReview";
import { withRouter } from "react-router";

class ProductReview extends React.Component {
  state = {
    reviewImg: null,
    reviewCount: 0,
    reviewAll: null, 
    loading: true,
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
      const {data: review} = await axios.get(`http://localhost:3003/api/review/${pathname}`);
      // console.log(review);
      this.setState({
        reviewImg: review.reviewImg, 
        reviewCount : review.reviewAll.total,
        reviewAll: review.reviewAll.rows,
        loading: false
      });
    } catch(err) {
      console.error(err);
    } 
  }

  async componentDidUpdate(prevProps, prevState) {
    const { pagingNumber } = this.state;
    if(prevState.pagingNumber !== pagingNumber) {
      const pathname = this.props.location.pathname;
      try {
        const {data: review} = await axios.get(`http://localhost:3003/api/review/${pathname}?page=${pagingNumber}&pagSize=5`);
        // console.log(review);
        this.setState({
          reviewImg: review.reviewImg, 
          reviewCount : review.reviewAll.total,
          reviewAll: review.reviewAll.rows,
          loading: false
        });
      } catch(err) {
        console.error(err);
      } 
    }
  }

  render() {
    const { reviewAll, reviewCount, loading, pagingNumber } = this.state;
    const { item, thumbnail, reviewArr } = this.props;
    return(
      <>
      { loading
        ? null
        : <div>
            <div className="product-review-title">
              <h1 className="production-selling-review">
                    리뷰<span>{reviewCount}</span>
              </h1>
              <WritingReview item={item} thumbnail={thumbnail}/>
            </div>
            <ProductReviewTop 
              reviewArr={reviewArr}
              reviewCount={reviewCount} />
            <ol>
            {reviewAll.map((v) => (
              <ProductReviewBottom 
                profilePathname = {v.profile_pathname}
                nickname = {v.nickname}
                starCount = {v.star_count}
                createdAt = {v.created_at}
                imgFilename = {v.img_filename}
                contents = {v.contents}
                thumbUp = {v.thumb_up} />
            ))}
            </ol>

            <Paging 
              pagingNumber={pagingNumber}
              pagingAmount={reviewCount}
              handlePagingPrevArrow={this.handlePagingPrevArrow}
              handlePagingNextArrow={this.handlePagingNextArrow}
              handlePagingNumber={this.handlePagingNumber}/>
          </div> }
    </>
    )
  }
}

export default withRouter(ProductReview);