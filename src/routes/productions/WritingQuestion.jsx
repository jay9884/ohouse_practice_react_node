import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router';
import Icon from '../../components/Icon';
import ReactModal from '../../components/ReactModal';

class WritingQuestion extends React.Component {
  state = {
    visible: false,
    contents: '',
    kind_of_question: ''
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { pathname } = this.props.location;
    const { contents, kind_of_question } = this.state;
    if(!contents) {
      alert('문의 내용을 입력해 주세요');
      return
    }
    if(!kind_of_question) {
      alert('문의 유형을 선택해 주세요');
      return
    }

    axios
      .post(`http://localhost:3003/api/question${pathname}`, {
        kind_of_question: kind_of_question,
        contents: contents
      })
      .then((res) => {
        alert("문의가 정상적으로 등록되었습니다.");
        window.location.replace(`${pathname}`);
      })
      .catch(err => {
        console.log(err);
      })
  }

  chooseKindOfQustion = (e) => {
    const { kind_of_question } = this.state;
    let newKindOfQuestion = kind_of_question;
    newKindOfQuestion = e.target.innerHTML;
    e.target.classList.toggle('clicked');
    this.setState({kind_of_question: newKindOfQuestion});
  }

  handleOnChange = (e) => {
    const { contents } = this.state;
    const { value } = e.target;
    let newContents = contents;
    newContents = value;
    this.setState({contents: newContents});
  }

  openModal = () => {
    this.setState({ visible: true });
  }

  closeModal = () => {
    this.setState({ visible: false})
  }

  render() {
    const { visible, contents } = this.state;
    const BODY = document.body;
    if(visible) {
      BODY.classList.add('stop-scrolling');
    } else {
      BODY.classList.remove('stop-scrolling');
    }
    return (
      <>
      <button 
        className="writing-question-button"
        onClick={this.openModal}>문의하기</button>
      {visible && <ReactModal
        visible={visible}
        maskClosable={true}
        closeModal={this.closeModal}
        closable={true}
        center={true}>
          <div className="writing-question-wrap">
            <form 
              className="writing-question-form-wrap"
              onSubmit={this.handleOnSubmit}>
              <button className="question-form-close-button"
                      type="button"
                      onClick={this.closeModal}>
                <Icon icon="close" size={30} color="#292929" />
              </button>
              <div className="question-title-wrap">
                <h1 className="question-title">리뷰 쓰기</h1>
              </div>
              <h1 className="kind-of-question-title">문의유형</h1>
              <div className="kind-of-question-wrap"
                    onClick={this.chooseKindOfQustion}>
                <div className="about-product"
                    >
                  상품
                </div>
                <div className="about-delivery">
                  배송
                </div>
                <div className="about-refund">
                  반품
                </div>
                <div className="about-exchange">
                  교환
                </div>
                <div className="about-refund-fee">
                  환불
                </div>
                <div className="about-etc">
                  기타
                </div>
              </div>
              <h1 className="kind-of-question-title">문의내용</h1>
              <textarea 
                name="" id="" value={contents}
                onChange={this.handleOnChange}></textarea>
              <p>문의내용에 대한 답변은 ‘마이페이지 &gt; 나의 쇼핑 &gt; 나의 문의내역’ 또는 ‘상품 상세페이지’에서 확인 가능합니다.</p>
              <div className="button-wrap">
                <button 
                  className="button big"
                  type="submit">완료</button>
              </div>
            </form>
          </div>
        </ReactModal>
      }
      </>
    )
  }
}

export default withRouter(WritingQuestion);