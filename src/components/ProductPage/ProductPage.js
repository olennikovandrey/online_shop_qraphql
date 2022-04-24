import client from "../../apollo";
import { GET_PRODUCT } from "../../services/queries";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import Attributes from "../Attributes/Attributes";
import { addToCart, removeItem, addFirstAttribute, addSecondAttribute, addThirdAttribute } from "../../actions/cart";
import { styles } from "../../assets/styles/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import React, { Component } from "react";
import "./product-page.css";
import "../Cart/styles/swiper.css";

SwiperCore.use([Navigation]);

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isBackgroundBlur: false,
      currentProduct: []
    };
    this.setBlur = this.setBlur.bind(this);
    this.addAttrFnGeneral = this.addAttrFnGeneral.bind(this);
  }

  async productLoader() {
    const id = this.props.match.params.id;
    const { data } = await client.query({
      query: GET_PRODUCT,
      variables: { productId: id }
    } );
    return data;
  }

  addItemToCart = (payload) => {
    this.props.addToCart(payload);
  };

  removeItemFromCart = (id) => {
    this.props.removeItem(id);
  };

  addAttrFnGeneral = (id, addFunction) => {
    addFunction(id);
  };

  setBlur = () => {
    this.setState({
      isBackgroundBlur: !this.state.isBackgroundBlur
    });
  };

  createMarkup(value) {
    return { __html: value };
  }

  async componentDidMount() {

    const data = await this.productLoader();
    this.setState({
      isLoaded: true,
      currentProduct: data.product
    });
  }

  render() {

    const { isLoaded, isBackgroundBlur, currentProduct } = this.state,
      { currency, availableProducts } = this.props,
      availableItem = availableProducts.find(item => item.id === currentProduct.id);
    console.log({currentProduct});
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
                    <img className="product-img" src={currentProduct.gallery[0]} alt={currentProduct.name} />
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
                          { currentProduct.attributes[0].length !== 0 ?
                            currentProduct.attributes[0].name.toUpperCase() + ":" :
                            null
                          }
                        </p>
                        }
                        <div className="prod-page-first-attr-parent">
                          <Attributes
                            attributes={ currentProduct.attributes[0] }
                            addAttrFnGeneral={ this.addAttrFnGeneral }
                            addAttrFnCurrent={ this.props.addFirstAttribute }
                            parentClass={".prod-page-first-attr-parent"}
                          />
                        </div>
                        { currentProduct.attributes[1] &&
                        <p className="product-sizes-title">
                          { currentProduct.attributes[1].length !== 0 ?
                            currentProduct.attributes[1].name.toUpperCase() + ":" :
                            null
                          }
                        </p>
                        }
                        <div className="prod-page-second-attr-parent">
                          <Attributes
                            attributes={ currentProduct.attributes[1] }
                            addAttrFnGeneral={ this.addAttrFnGeneral }
                            addAttrFnCurrent={ this.props.addSecondAttribute }
                            parentClass={".prod-page-second-attr-parent"}
                          />
                        </div>
                        { currentProduct.attributes[2] &&
                        <p className="product-sizes-title">
                          { currentProduct.attributes[2].length !== 0 ?
                            currentProduct.attributes[2].name.toUpperCase() + ":" :
                            null
                          }
                        </p>
                        }
                        <div className="prod-page-third-attr-parent">
                          <Attributes
                            attributes={ currentProduct.attributes[2] }
                            addAttrFnGeneral={ this.addAttrFnGeneral }
                            addAttrFnCurrent={ this.props.addThirdAttribute }
                            parentClass={".prod-page-third-attr-parent"}
                          />
                        </div>
                      </div>
                    </> : null
                  }
                  <p className="product-price-title">PRICE:</p>
                  <p className="product-price">{ currency } { currentProduct.prices.filter(current => current.currency.symbol === currency)[0].amount }</p>
                  <p className="product-price-title">IN STOCK:</p>
                  <p className="product-price">{ availableItem !== undefined ? "Yes" : "No" }</p>
                  <button
                    className={ availableItem ?? availableItem !== undefined ? "prod-page-add-btn" : "unavailable-add-btn" }
                    onClick={ availableItem !== undefined ? () => this.addItemToCart(currentProduct) : null }>ADD TO CART
                  </button>
                  <div className="product-description" dangerouslySetInnerHTML={ this.createMarkup(currentProduct.description) } />
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
  availableProducts: PropTypes.array,
  currency: PropTypes.string,
  addToCart: PropTypes.func,
  removeItem: PropTypes.func,
  addFirstAttribute: PropTypes.func,
  addSecondAttribute: PropTypes.func,
  addThirdAttribute: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    availableProducts: state.availableProducts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => {
      dispatch(addToCart(payload));
    },
    removeItem: (payload) => {
      dispatch(removeItem(payload));
    },
    addFirstAttribute: (id) => {
      dispatch(addFirstAttribute(id));
    },
    addSecondAttribute: (id) => {
      dispatch(addSecondAttribute(id));
    },
    addThirdAttribute: (id) => {
      dispatch(addThirdAttribute(id));
    },
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(ProductPage));
