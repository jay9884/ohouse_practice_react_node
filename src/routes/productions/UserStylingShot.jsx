import React from "react";
import Icon from "../../components/Icon";

class UserStylingShot extends React.Component {
  render() {
  const { reviewImg } = this.props;

    return(
      <div className="user-styling-shot-wrap">
        <div className="user-styling-shot-wrap-top">
          <h1 className="user-styling-shot-title">
            유저들의 스타일링샷
            <span className="user-styling-shot-count">
            {reviewImg.length}
            </span>
          </h1>
          
        </div>
        <div className="user-styling-shot-wrap-middle">
          <button className="left-arrow">
            <Icon icon="chevron" size={20} color="#ffffff" />
          </button>
          <button className="right-arrow">
            <Icon icon="chevron" size={20} color="#ffffff" />
          </button>
          <ol>
          {reviewImg.map((v) => {
            console.log(v)
            return (<li>
              <div className="review-images-wrap">
                <div 
                  className="review-images"
                  key={v.img_filename}
                  style={{backgroundImage: `url(/review/${v.img_filename})`}}></div>
                <div className="review-user-info">
                  <span>{v.id}</span>
                </div>
              </div>
              </li>)
            
          })}
          </ol>
        </div>
        <div className="user-styling-shot-wrap-bottom">

        </div>
      </div>
    )
  }
}

export default UserStylingShot;