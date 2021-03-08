import React from "react";
import ProductReviewBottom from "./ProductReviewBottom";
import ProductReviewTop from "./ProductReviewTop";
import WritingReview from "./WritingReview";

class ProductReview extends React.Component {
  render() {
    const { reviewAll, reviewCount, item, thumbnail } = this.props;
    console.log(reviewAll);
    const reviewArr = reviewAll.map((v) => v.star_count)
    return(
      <div>
        <div className="product-review-title">
          <h1 className="production-selling-review"
              id="production-selling-review">
                리뷰<span>{reviewCount}</span>
          </h1>
          <WritingReview item={item} thumbnail={thumbnail}/>
        </div>
        <ProductReviewTop 
          reviewArr={reviewArr}
          reviewCount={reviewCount} />
        <ol>
        {reviewAll.reverse().map((v) => (
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
      </div>
    )
  }
}

export default ProductReview;