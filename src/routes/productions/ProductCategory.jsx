import React from "react";

class ProductCategory extends React.Component {
  render () {
    const { category } = this.props
    return(
      <div className="product-header-category-wrap">
        { category.map((v) => (
            <span key={v.category_id}>
              {v.category}
            </span>
        ))}
      </div>
    )
  }
}

export default ProductCategory;