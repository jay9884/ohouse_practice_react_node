import React from 'react';

class ReactModal extends React.Component {
  // componentDidMount () {
  //   document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`
  //   return () => {
  //   const scrollY = document.body.style.top
  //   document.body.style.cssText = `position: ""; top: "";`
  //   window.scrollTo(0, parseInt(scrollY || '0') * -1)
  //   }
  // }

  onMaskClick = (e) => {
    const {closeModal} = this.props;
    if(e.target === e.currentTarget) {
      closeModal(e)
    }
  }

  render() {
    const {visible, children, maskClosable, closeModal, closable, center} = this.props;
    return (
      <>
      <div className={visible ? "modal-overlay show" : "modal-overlay"}>
      </div>
      <div className={visible ? "modal-wrap show" : "modal-wrap"}
            tabIndex="-1"
            onClick={maskClosable ? this.onMaskClick : null}>
        <div className="modal-inner"
              style={center ? {top: 50+"%"} : null}
            tabIndex="0">
          {children}
        </div>
      </div>
      </>
    )
  }
}

export default ReactModal;