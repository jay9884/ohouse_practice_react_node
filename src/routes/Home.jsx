import React from "react";

class Home extends React.Component {
  render() {
    return (
      <div className="main-page">
        <div className="container">
          <div className="home-images-wrap">
            <img src="/home/carousel0.png" alt=""/>
            <img src="/home/carousel1.png" alt=""/>
            <img src="/home/carousel2.jpg" alt=""/>
            <img src="/home/carousel3.png" alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;