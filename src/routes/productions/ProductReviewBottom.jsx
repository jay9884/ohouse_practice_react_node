import React from "react";
import StarCount from "../../components/StarCount";

class ProductReviewBottom extends React.Component {
  render() {
    const { profilePathname, nickname, starCount, imgFilename, contents, thumbUp, createdAt } = this.props;
    return (
      <li className="product-review-bottom">
        <div className="product-review-user-profile">
          <img src={profilePathname 
                    ? `/profileImg/${profilePathname}`
                    : '/sns_login/icon-default-user.svg'} alt=""/>
        </div>
        <div className="product-review-user-contents-wrap">
          <div className="product-review-user-info">
            <div className="product-review-user-info-top">
              <span>{nickname}</span>
            </div>
            <div className="product-review-user-info-bottom">
              <StarCount WIDTH={parseInt(starCount) * 14} SIZE={14}/>
              <span>{createdAt.substring(0, 10)}</span>
            </div>
          </div>
          <div className="product-review-user-image">
            {imgFilename 
              ? <img src={`/review/${imgFilename}`} alt="리뷰 이미지"/>
              : null }
          </div>
          <div className="product-review-user-content">
              <p>{contents}</p>
          </div>
          <div className="product-review-thumb-up-button">
             <button className="button reverse" type="submit">
               도움이 돼요
             </button>
             <span>{thumbUp}명에게 도움이 되었습니다.</span>
          </div>
        </div>
      </li>
    )
  }
}

export default ProductReviewBottom;