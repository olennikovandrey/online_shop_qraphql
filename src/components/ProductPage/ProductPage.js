
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import Attributes from "../Attributes/Attributes";
import * as functions from "../../services/functions";
import { addToCart, removeItem } from "../../actions/cart";
import { styles } from "../../assets/styles/styles";
import { connect } from "react-redux";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import React, { Component } from "react";
import "./product-page.css";
import "../Cart/styles/swiper.css";

SwiperCore.use([Navigation]);

class ProductPage extends Component {
  _id = this.props.match.params.id;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isBackgroundBlur: false,
      currentProduct: {},
      firstAttr: false,
      secondAttr: false,
      thirdAttr: false
    };
    this.setBlur = this.setBlur.bind(this);
    this.addFirstAttribute = this.addFirstAttribute.bind(this);
    this.addSecondAttribute = this.addSecondAttribute.bind(this);
    this.addThirdAttribute = this.addThirdAttribute.bind(this);
  }

  addFirstAttribute = (value) => {
    this.setState({
      currentProduct: { ...this.state.currentProduct, firstAttr: value},
      firstAttr: true
    });
  };

  addSecondAttribute = (value) => {
    this.setState({
      currentProduct: { ...this.state.currentProduct, secondAttr: value},
      secondAttr: true
    });
  };

  addThirdAttribute = (value) => {
    this.setState({
      currentProduct: { ...this.state.currentProduct, thirdAttr: value},
      thirdAttr: true
    });
  };

  addItemToCart = (payload) => {
    this.props.addToCart(payload);
  };

  removeItemFromCart = (id) => {
    this.props.removeItem(id);
  };

  setBlur = () => {
    this.setState({
      isBackgroundBlur: !this.state.isBackgroundBlur
    });
  };

  async componentDidMount() {
    const data = await functions.productLoader(this._id);
    const currentProduct = Object.assign({}, { ...data.product, firstAttr: [], secondAttr: [], thirdAttr: [], workID: data.product.id } );
    this.setState({
      isLoaded: true,
      currentProduct: currentProduct
    });
  }

  render() {

    const { isLoaded, isBackgroundBlur, currentProduct, firstAttr, secondAttr, thirdAttr } = this.state,
      { currency } = this.props;

    if (isLoaded && currentProduct.length !== 0) {
      return (
        <>
          <Header
            setCategoryName={ null }
            setBlur={ this.setBlur }
          />
          <section style={ isBackgroundBlur ? styles.ProductPageWrapperBlur : styles.ProductPageWrapper }>
            <Link to="/"><span className="homelink">HOMEPAGE</span></Link>
            <div className="product-page-content-wrapper">
              <div className="preview-img-wrapper">
                { currentProduct.gallery.slice(1, 5).map(
                  item =>
                    <img key={ item } className="preview-img" src={ item } width="80" height="auto" alt={ currentProduct.name } />
                )
                }
              </div>
              <div className="product-info">
                <div className="product-img-wrapper">
                  { currentProduct.gallery.length > 1 ?
                    <Swiper
                      navigation={ true }
                      effect={ "cube" }
                      loop={ true }
                      mousewheel={ true }
                      slidesPerView={ "auto" }
                      spaceBetween={ 150 }
                      centeredSlides={ true }
                    >
                      {currentProduct.gallery.map((item) =>
                        <SwiperSlide key={ item }>
                          <img className="product-img" src={ item } alt={ currentProduct.name } />
                        </SwiperSlide>
                      )}
                    </Swiper> :
                    <img className="product-img" src={ currentProduct.gallery[0] } alt={ currentProduct.name } />
                  }
                </div>
                <div className="product-details">
                  <p className="product-name">{ currentProduct.brand }</p>
                  <p className="product-brief-description">{ currentProduct.name }</p>
                  { currentProduct.attributes ?
                    <>
                      <div className="available-sizes-wrapper">
                        { currentProduct.attributes[0] &&
                        <p className="product-sizes-title">
                          { currentProduct.attributes[0].length !== 0 &&
                            currentProduct.attributes[0].name.toUpperCase() + ":"
                          }
                        </p>
                        }
                        <div className="prod-page-first-attr-parent">
                          <Attributes
                            attributes={ currentProduct.attributes[0] }
                            addAttribute={ this.addFirstAttribute }
                            parentClass={".prod-page-first-attr-parent"}
                          />
                        </div>
                        { currentProduct.attributes[1] &&
                        <p className="product-sizes-title">
                          { currentProduct.attributes[1].length !== 0 &&
                            currentProduct.attributes[1].name.toUpperCase() + ":"
                          }
                        </p>
                        }
                        <div className="prod-page-second-attr-parent">
                          <Attributes
                            attributes={ currentProduct.attributes[1] }
                            addAttribute={ this.addSecondAttribute }
                            parentClass={".prod-page-second-attr-parent"}
                          />
                        </div>
                        { currentProduct.attributes[2] &&
                        <p className="product-sizes-title">
                          { currentProduct.attributes[2].length !== 0 &&
                            currentProduct.attributes[2].name.toUpperCase() + ":"
                          }
                        </p>
                        }
                        <div className="prod-page-third-attr-parent">
                          <Attributes
                            attributes={ currentProduct.attributes[2] }
                            addAttribute={ this.addThirdAttribute }
                            parentClass={".prod-page-third-attr-parent"}
                          />
                        </div>
                      </div>
                    </> : null
                  }
                  <p className="product-price-title">PRICE:</p>
                  <p className="product-price">{ currency } { currentProduct.prices.filter(current => current.currency.symbol === currency)[0].amount }</p>
                  <p className="product-price-title">IN STOCK:</p>
                  <p className="product-price">{ currentProduct.inStock ? "Yes" : "No" }</p>
                  <button
                    className={ currentProduct.inStock ? "prod-page-add-btn" : "unavailable-add-btn" }
                    onClick={
                      typeof currentProduct.attributes[2] !== "undefined" && thirdAttr &&
                      typeof currentProduct.attributes[1] !== "undefined" && secondAttr && firstAttr && currentProduct.inStock ?
                        () => this.addItemToCart(currentProduct) :
                        typeof currentProduct.attributes[2] === "undefined" && !thirdAttr &&
                        typeof currentProduct.attributes[1] !== "undefined" && secondAttr && firstAttr && currentProduct.inStock ?
                          () => this.addItemToCart(currentProduct) :
                          typeof currentProduct.attributes[2] === "undefined" && !thirdAttr &&
                          typeof currentProduct.attributes[1] === "undefined" && !secondAttr && firstAttr && currentProduct.inStock ?
                            () => this.addItemToCart(currentProduct) :
                            typeof currentProduct.attributes[2] === "undefined" && !thirdAttr &&
                            typeof currentProduct.attributes[1] === "undefined" && !secondAttr &&
                            typeof currentProduct.attributes[1] === "undefined" && !firstAttr && currentProduct.inStock ?
                              () => this.addItemToCart(currentProduct) :
                              null
                    }
                  >
                    { typeof currentProduct.attributes[2] !== "undefined" && thirdAttr &&
                      typeof currentProduct.attributes[1] !== "undefined" && secondAttr && firstAttr ? "ADD TO CART" :
                      typeof currentProduct.attributes[2] === "undefined" && !thirdAttr &&
                        typeof currentProduct.attributes[1] !== "undefined" && secondAttr && firstAttr ? "ADD TO CART" :
                        typeof currentProduct.attributes[2] === "undefined" && !thirdAttr &&
                          typeof currentProduct.attributes[1] === "undefined" && !secondAttr && firstAttr ? "ADD TO CART" :
                          typeof currentProduct.attributes[2] === "undefined" && !thirdAttr &&
                            typeof currentProduct.attributes[1] === "undefined" && !secondAttr &&
                            typeof currentProduct.attributes[0] === "undefined" && !firstAttr ? "ADD TO CART" :
                            "PLEASE, CHOOSE ATTRIBUTE"
                    }
                  </button>
                  <div className="product-description" dangerouslySetInnerHTML={ functions.createMarkup(DOMPurify.sanitize(currentProduct.description)) } />
                </div>
              </div>
            </div>
          </section>
        </>
      );
    } else {
      return (
        <div className="product-page-wrapper">
          <Loader />
        </div>
      );
    }
  }
}

ProductPage.propTypes = {
  match: PropTypes.object,
  currency: PropTypes.string,
  addToCart: PropTypes.func,
  removeItem: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => {
      dispatch(addToCart(payload));
    },
    removeItem: (payload) => {
      dispatch(removeItem(payload));
    }
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(ProductPage));
