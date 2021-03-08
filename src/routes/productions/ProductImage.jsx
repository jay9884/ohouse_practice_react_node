import React from "react";

class ProductImage extends React.Component {
  render () {
    const {image} = this.props;
    return(
      <div>
        <h1 className="product-image-title"
            id="production-selling-information">
          상품정보
        </h1>
        <ol className="product-image-wrap">
          {image.map((v, index) => (
            <li>
              <img className="product-item"
                  key={v.image_id}
                  id={index}
                  alt="상품정보 이미지"
                  src={`/productions/pro-id-${v.pro_id}/${v.image}`} />
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ProductImage;