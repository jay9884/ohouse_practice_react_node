import React from "react";
import Icon from "../../components/Icon";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

class UserStylingShot extends React.Component {
  state = {
    currentImgIndex: 0,
    currentTransform: 0,
    miniCurrentTransform: 0
  }

  handleOnClick = (e) => {
    const { value } = e.target;
    let newCurrentImgIndex = parseInt(value);
    let newCurrentTransform = parseInt(value) * (-524);
    let newMiniCurrentTransform = parseInt(value) * (-79);
    
    this.setState({
      currentImgIndex: newCurrentImgIndex, 
      currentTransform: newCurrentTransform,
      miniCurrentTransform: newMiniCurrentTransform
    })
  }

  nextReviewImage = () => {
    const { reviewImg } = this.props;
    const LENGTH = reviewImg.length;
    const { currentImgIndex, currentTransform, miniCurrentTransform } = this.state;

    if(currentImgIndex >= LENGTH - 1) {
      return
    }

    let newCurrentImgIndex = currentImgIndex;
    newCurrentImgIndex += 1;
    let newCurrentTransfrom = currentTransform;
    newCurrentTransfrom -= 524;
    let newMiniCurrentTransform = miniCurrentTransform;
    if(currentImgIndex >= 4) {
      newMiniCurrentTransform -= 79;
    }
    this.setState(
      {currentImgIndex: newCurrentImgIndex, 
        currentTransform: newCurrentTransfrom,
        miniCurrentTransform: newMiniCurrentTransform
      });
  }

  prevReviewImage = () => {
    const { currentImgIndex, currentTransform, miniCurrentTransform } = this.state;
    const { reviewImg } = this.props;
    const LENGTH = reviewImg.length;

    if(currentImgIndex < 1) {
      return
    } 

    let newCurrentImgIndex = currentImgIndex;
    newCurrentImgIndex -= 1;
    let newCurrentTransfrom = currentTransform;
    newCurrentTransfrom += 524;
    let newMiniCurrentTransform = miniCurrentTransform;
    if(currentImgIndex < LENGTH && currentImgIndex > 4) {
      newMiniCurrentTransform += 79;
    }
    this.setState(
      {currentImgIndex: newCurrentImgIndex, 
        currentTransform: newCurrentTransfrom,
        miniCurrentTransform: newMiniCurrentTransform
      });
  }

  render() {
    const { currentImgIndex, currentTransform, miniCurrentTransform } = this.state;
    const { reviewImg } = this.props;
    const LENGTH = reviewImg.length;
    // const settings = {
    //   dots: true, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    //   arrows: true,
    //   infinite: false, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    //   speed: 500, // 애미메이션의 속도, 단위는 milliseconds
    //   slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄 지
    //   slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    //   autoplay: false
    // };

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
          <ol>
              <div className="slick-slider">
                <button className="slick-prev"
                        onClick={this.prevReviewImage}>
                  <Icon icon="chevron" size={20} color="#3F4150" />
                </button>
          
                <div className="slick-list">
                  <div className="slick-track"
                        style={{width: 528 * LENGTH,
                                transform: `translate3d(${currentTransform}px, 0, 0)`}}>
                    {reviewImg.map((v, i) => {
                      return (
                        <li key={v.img_filename}>
                          <div className="review-images-wrap">
                            <div 
                              className="review-images"
                              style={{backgroundImage: `url(/review/${v.img_filename})`}}></div>
                            <div className="review-user-info">
                              <div className="review-user-info-left">
                                <img src="/sns_login/icon-default-user.svg" alt="유저 프로필"/>
                                <span>{v.id}</span>
                              </div>
                              <div className="review-user-info-right">
                                <span><span>{i + 1}</span>/<span>{LENGTH}</span></span>
                              </div>
                            </div>
                          </div>
                        </li>
                    )})}
                  </div>
                </div>

                <button className="slick-next"
                        onClick={this.nextReviewImage}>
                  <Icon icon="chevron" size={20} color="#3F4150" />
                </button>
              </div>
          </ol>
        </div>
        <div className="user-styling-shot-wrap-bottom">
          <div className="slick-list mini">
            <div className="slick-track mini"
                  style={{width: 79 * LENGTH,
                    transform: `translate3d(${miniCurrentTransform}px, 0, 0)`}}>
              {reviewImg.map((v, i) => {
                return (
                  <div className="review-images-wrap mini"
                        style={(i === currentImgIndex) ? {border:'3px solid #3DA8F5'} : null}>
                    <button 
                      className="review-images mini"
                      value={i}
                      type="button"
                      style={{backgroundImage: `url(/review/${v.img_filename})`}}
                      onClick={this.handleOnClick}></button>
                  </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserStylingShot;