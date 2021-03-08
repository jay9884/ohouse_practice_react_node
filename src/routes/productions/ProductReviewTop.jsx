import React from "react";
import StarCount from "../../components/StarCount";

class ProductReviewTop extends React.Component {
  render() {
    const { reviewArr, reviewCount } = this.props;
    let star_count_sum = reviewArr.reduce((acc, cur) => parseInt(acc) + parseInt(cur), 0);
    let average = parseFloat(star_count_sum / parseInt(reviewCount));
    let WIDTH = average / 5 * 100; 
    return(
      <div className="product-review-top">
        <div className="product-review-top-left">
          <StarCount WIDTH={WIDTH + 10} SIZE={22}/>
          <h1 className="average-title">
            {average.toFixed(1)}
          </h1>
        </div>
        <div className="product-review-top-right">
          <ul className="product-review-each-star">
            <li>
              <span>5점</span>
              <div className="product-review-each-star-per-background">
                <div className="product-review-each-star-per-display"
                      style={{width: 180 * `${reviewArr.filter((v) =>  v === 5).length / parseInt(reviewCount)}` + "px"}}>
                </div>
              </div>
              
              <span>{reviewArr.filter((v) =>  v === 5).length}</span>
            </li>
            <li>
              <span>4점</span>
              <div className="product-review-each-star-per-background">
                <div className="product-review-each-star-per-display"
                      style={{width: 180 * `${reviewArr.filter((v) =>  v === 4).length / parseInt(reviewCount)}` + "px"}}>
                </div>
              </div>
              <span>{reviewArr.filter((v) =>  v === 4).length}</span>
            </li>
            <li>
              <span>3점</span>
              <div className="product-review-each-star-per-background">
                <div className="product-review-each-star-per-display"
                      style={{width: 180 * `${reviewArr.filter((v) =>  v === 3).length / parseInt(reviewCount)}` + "px"}}>
                </div>
              </div>
              <span>{reviewArr.filter((v) =>  v === 3).length}</span>
            </li>
            <li>
              <span>2점</span>
              <div className="product-review-each-star-per-background">
                <div className="product-review-each-star-per-display"
                      style={{width: 180 * `${reviewArr.filter((v) =>  v === 2).length / parseInt(reviewCount)}` + "px"}}>
                </div>
              </div>
              <span>{reviewArr.filter((v) =>  v === 2).length}</span>
            </li>
            <li>
              <span>1점</span>
              <div className="product-review-each-star-per-background">
                <div className="product-review-each-star-per-display"
                      style={{width: 180 * `${reviewArr.filter((v) =>  v === 1).length / parseInt(reviewCount)}` + "px"}}>
                </div>
              </div>
              <span>{reviewArr.filter((v) =>  v === 1).length}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default ProductReviewTop;