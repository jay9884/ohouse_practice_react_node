import React from "react";
import axios from "axios";
import ProductCategory from "./ProductCategory";
import ProductThumbnail from "./ProductThumbnail";
import ProductOptions from "./ProductOptions";
import ProductIndex from "./ProductIndex";
import ProductImage from "./ProductImage";
import ProductDetail from "./ProductDetails";
import ProductTab from "./ProductTab";
import UserStylingShot from "./UserStylingShot";
import ProductReview from "./ProductReview";

class Productions extends React.Component {
  state = {
    item: null,
    category: null,
    thumbnail: null,
    image: null,
    option: null,
    add_option: null,
    detail: null,
    delivery: null,
    loading: true,
    reviewImg: null,
    reviewCount: 0,
    reviewAll: null
  }

  async componentDidMount() {
    const pathname = this.props.location.pathname;
    try {
      const {data} = await axios.get(`http://localhost:3003/api${pathname}`);
      this.setState({
        item: data[0].item,
        category: data[0].category,
        thumbnail: data[0].thumbnail,
        image: data[0].image,
        option: data[0].option,
        add_option: data[0].add_option,
        detail: data[0].detail,
        delivery: data[0].delivery,
      })

      // console.log(data[0]);
    } catch(err) {
      console.error(err);
    }

    try {
      const {data: review} = await axios.get(`http://localhost:3003/api/review${pathname}`);
      // console.log(review);
      this.setState({
        reviewImg: review.reviewImg, 
        reviewCount : review.reviewAll.total,
        reviewAll: review.reviewAll.rows});
    } catch(err) {
      console.error(err);
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const { 
      item, category, thumbnail, 
      image, option, add_option, 
      detail, delivery, loading,
      reviewImg, reviewCount, reviewAll } = this.state;
    return (
      <>
      {loading
      ? null
      : <div className="product-all-container">
          <div className="container">
            <ProductCategory
              category={category} />
          </div>
          <div className="product-header-wrap">
            <div className="container">
              <div className="row">
                <div className="col-xl-7">
                  <div className="product-header-thumbnail-header">
                    <ProductThumbnail
                    thumbnail={thumbnail} />
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="product-header-index-header">
                    <ProductIndex
                      item={item} />
                    <ProductOptions
                      option={option} 
                      add_option={add_option}
                      mini={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductTab 
            reviewCount={reviewCount}/>
          <div className="product-body-user-styling-shot-wrap">
            <div className="container">
              <div className="row">
                <div className="col-xl-8">
                  <UserStylingShot reviewImg={reviewImg} />
                </div>
                <div className="col-xl-4">
                    <ProductOptions
                      option={option} 
                      add_option={add_option}
                      mini={true} />
                </div>
              </div>
            </div>
          </div>
          <div className="product-images">
            <div className="container">
              <div className="row">
                <div className="col-xl-8">
                  <ProductImage
                    image={image} />
                </div>
              </div>
            </div>
          </div>
          <div className="product-detail-info-table">
            <div className="container">
              <div className="row">
                <div className="col-xl-8">
                <ProductDetail
                  detail={detail} />
                </div>
              </div>
            </div>
          </div>
          <div className="product-review">
            <div className="container">
              <div className="row">
                <div className="col-xl-8">
                <ProductReview 
                  reviewAll={reviewAll}
                  reviewCount={reviewCount}
                  item={item}
                  thumbnail={thumbnail} />
                </div>
              </div>
            </div>
          </div>
          
          
          <div
            detail={detail} 
            delivery={delivery} > </div>
        </div>
      }
      </>
    )
  }
}

export default Productions;