import React from "react";
import axios from "axios";
import Icon from "../../components/Icon";

class WritingReview extends React.Component {
  state = {
    hover_idx: 0, star_hover: false,
    click_idx: 0, star_click: false,
    inputValue: '', isTyping: false,
    isClicked: false, isChecked: false,
    content: '',
    uploadedImg: {filename: "", filepath: ""},
    review_on: false
  }

  handleOnImgSubmit = (e) => {
      e.preventDefault();
      const { item: { pro_id } } = this.props;
      const { content } = this.state;
      console.log(pro_id, content)
      const formData = new FormData();
      console.log('1', formData);
      formData.append("img", content); 
      // `http://localhost:3001/api/review/product_id=${pro_id}/img`
      axios
        .post(`http://localhost:3001/api/review/img/product_id/${pro_id}`, formData)
        .then(res => {
          console.log('2', res.data);
          const { filename } = res.data;
          console.log(filename);
          this.setState({ filename: filename, filepath: `http://localhost:3001/img/${filename}` });
          alert("The file is successfully uploaded");
        })
        .catch(err => {
          console.error(err);
        });
  }

  handleOnClick = () => {
    this.setState({ review_on: true })
  }

  handleOnMouseOver = (e) => {
    this.setState({ star_hover: true, hover_idx: e.currentTarget.value });
  }

  handleOnMouseLeave = (e) => {
    const { star_click } = this.state;
    star_click 
      ? this.setState({ star_click: true }) 
      : this.setState({ star_click: false, hover_idx: undefined})
    this.setState({ star_hover: false });
  }

  handleOnMouseUp = (e) => {
    this.setState({ star_click: true, click_idx: e.currentTarget.value });
  }

  handleOnChange = (e) => {
    let newInputValue = e.currentTarget.value;
    this.setState({ inputValue: newInputValue, isTyping: true })
  }

  handleCheckboxClick = (e) => {
    this.setState({ isClicked: true, isChecked: e.currentTarget.checked})
  }

  setFile = (e) => {
    this.setState(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  render() {
    const { review_on, star_hover, hover_idx, star_click, click_idx, inputValue, isTyping, isChecked, isClicked, uploadedImg } = this.state;
    const { item, thumbnail } = this.props;
    const { pro_title, com_name } = item;
    const { pro_id, thumbnail: thumb } = thumbnail[0];
    const star_arr = [0, 1, 2, 3, 4];
    return (
      <>
      <button onClick={this.handleOnClick}>리뷰쓰기</button>
      <div className="writing-review-wrap">
        <form
          
          className={review_on ? "writing-review-form-wrap" : "writing-review-form-wrap show"}>
          <div className="review-title-wrap">
            <h1 className="review-title">리뷰 쓰기</h1>
          </div>
          <div className="review-point-info-wrap">
            <span className="review-point-info">포토리뷰 250P, 일반리뷰 0P</span>
          </div>
          <div className="product-thumbnail-and-info">
            <div className="product-thumbnail"
                  style={{backgroundImage: `url(/productions/pro-id-${pro_id}/${thumb})`}}>
            </div>
            <div className="product-title-and-company">
              <h3 className="product-company">{com_name}</h3>
              <h2 className="product-title">{pro_title}</h2>
            </div>
          </div>
          <div className="review-count-wrap">
            <div className="review-count-wrap-top">
              <h2 className="review-count-text">
                별점 평가
              </h2>
            </div>
            <div className="review-count-wrap-bottom">
              <span>만족도</span>
              {/* <Icon icon="star" size={20} color="#E0E2E7" #3DA8F5/> */}
              <ul className="review-star-count">
                  
                  {star_arr.map((v, i) => (
                    <li 
                        onMouseOver={this.handleOnMouseOver}
                        onMouseLeave={this.handleOnMouseLeave}
                        onMouseUp={this.handleOnMouseUp} 
                        key={`star${v}`} 
                        value={i}>
                      { star_click && (click_idx >= i)
                        ? (star_hover && (hover_idx >= i)
                            ? (<Icon icon="filledStar" size={36} color={"#35c5f0"}/>)
                            : (<Icon icon="filledStar" size={36} color={"#3DA8F5"}/>))
                        : (star_hover && (hover_idx >= i)
                            ? (<Icon icon="filledStar" size={36} color={"#35c5f0"}/>)
                            : (<Icon icon="filledStar" size={36} color={"#E0E2E7"}/>))
                      }
                    </li>
                  ))}
                {/* <li><Icon icon="star" size={36} color="#22C58B"/></li> */}
              </ul>
            </div>
          </div>
            <div className="review-photo-wrap">
              <h1 className="review-photo-title">
                사진 첨부 (선택)
              </h1>
              <p className="review-photo-info">
                사진을 첨부해주세요. (최대 1장)
              </p>
              <form action="/uploadFile" enctype="multipart/form-data" method="post">
                <label htmlFor="input_file">파일 첨부하기</label>
                <input type="file" id="input_file" name="attachment" accept="image/gif, image/jpeg, image/png" 
                        onChange={this.setFile}
                        onSubmit={this.handleOnImgSubmit}/>
                {uploadedImg ? (
                  <>
                    <img src={uploadedImg.filepath} alt="" />
                    <h3>{uploadedImg.filename}</h3>
                  </>
                ) : (
                  ""
                )}
                {/* <button type="submit" class="btn btn-primary">Upload</button> */}
              </form>
            </div>
            <div className="review-contents-wrap">
              <h1 className="review-contents-title">
                리뷰 작성 
                {isTyping && !inputValue 
                  ? <p style={{color:'#ff7777', fontSize: 13+"px", fontWeight: 400}}>필수 입력 항목입니다.</p> 
                  : null}
              </h1>
              <textarea name="" id="" value={ inputValue } 
                        onChange={this.handleOnChange}
                        placeholder="자세하고 솔직한 리뷰는 다른 고객에게 큰 도움이 됩니다.(최소 20자 이상)"></textarea>
            </div>
            <div className="real-user-review-check">
              <h1 className="real-user-review-check-title">
                상품을 직접 사용하고 작성한 리뷰인가요?
              </h1>
              <div className="real-user-review-check-box">
                <input type="checkbox" onClick={this.handleCheckboxClick}/>
                <p className="real-user-review-check-info">
                  네. 상품을 직접 사용 후 작성한 리뷰이며, 오늘의 집 리뷰 정책에 동의합니다.
                  {isClicked && !isChecked 
                  ? <p style={{color:'#ff7777', fontSize: 13+"px"}}>필수 동의 항목입니다.</p> 
                  : null}
                </p>
              </div>
            </div>
          
          <button className="button big submit">완료</button>
        </form>
        <ul className="warning-info">
          <li>비구매 상품 리뷰 포인트는 심사 후 지급됩니다. (영업일 기준 2~3일 소요)</li>
          <li>포인트는 최초 작성한 리뷰를 기준으로 지급됩니다.</li>
          <li>사진 첨부시 캡쳐, 도용, 유사상품 촬영, 동일상품 여부 식별이 불가한 경우에는 등록이 거절되며 사유는 별도 안내되지 않습니다.</li>
          <li>상품과 무관한 내용이나 사진, 동일 문자 반복 등의 부적합한 리뷰는 사전 경고 없이 삭제 및 포인트 회수될 수 있습니다.</li>
        </ul>
      </div>
      </>
    )
  }
}

export default WritingReview;