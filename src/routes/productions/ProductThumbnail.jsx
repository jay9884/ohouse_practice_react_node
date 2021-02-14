import React from "react";

class ProductThumbnail extends React.Component {
  state= {
    thumbnail_num : 0
  }
  handleOnMouseOver = (e) => {
    this.setState({ thumbnail_num: e.currentTarget.id })
  }

  render () {
    const { thumbnail } = this.props;
    const { thumbnail_num } = this.state;

    return(
      <div className="product-thumbnails">
        <div className="product-thumbnails-left">
          {thumbnail.map((v, index) => (
            <div className="thumbnail-wrap"
                  key={v.thumbnail_id}
                  id={index}
                  onMouseOver={this.handleOnMouseOver}
                  style={{backgroundImage: `url(/productions/pro-id-${v.pro_id}/${v.thumbnail})`}}>
            </div>
          ))}
        </div>
        <div className="product-thumbnails-right"
              style={{backgroundImage: `url(/productions/pro-id-${thumbnail[0].pro_id}/${thumbnail[thumbnail_num].thumbnail})`}}>
        </div>
      </div>
    )
  }
}

export default ProductThumbnail;