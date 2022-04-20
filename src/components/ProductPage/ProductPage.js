import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import Attributes from "../Attributes/Attributes";
import { addToCart, removeItem, addFirstAttribute, addSecondAttribute, addThirdAttribute } from "../../actions/cart";
import { styles } from "../../assets/styles/styles";
import "./product-page.css";
import "../Cart/styles/swiper.css";

SwiperCore.use([Navigation]);

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isBackgroundBlur: false
    };
    this.setBlur = this.setBlur.bind(this);
    this.addAttrFnGeneral = this.addAttrFnGeneral.bind(this);
  }

  addItemToCart = (id) => {
    this.props.addToCart(id);
  };

  removeItemFromCart = (id) => {
    this.props.removeItem(id);
  };

  addAttrFnGeneral = (event, id, addFunction) => {
    addFunction(id);
    if (!id.includes("#") && event.target.classList.contains("size")) {
      event.target.classList.toggle("selected-size");
    } else if (id.includes("#") && event.target.classList.contains("size")) {
      event.target.classList.toggle("selected-color");
    } else if (event.target.classList.contains("disabled-size") ||
               event.target.classList.contains("selected-size") ||
               event.target.classList.contains("selected-color") ||
               event.target.classList.contains("disabled-color")) {
      return
    }
  };

  setBlur = () => {
    this.setState({
      isBackgroundBlur: !this.state.isBackgroundBlur
    });
  };

  createMarkup(value) {
    return { __html: value };
  }

  componentDidMount() {
    this.setState({
      isLoaded: true
    });
  }

  render() {
    const { isLoaded, isBackgroundBlur } = this.state,
          { currency, addedItems, availableProducts, shopData } = this.props,
          catalog = JSON.parse(localStorage.getItem("shopData")),
          currentProduct = catalog[0].products.filter(item => item.id === this.props.match.params.id)[0] || shopData[0].products.filter(item => item.id === this.props.match.params.id)[0],
          currentAddedProduct = this.props.addedItems.filter( el => el.id === this.props.match.params.id)[0],
          availableItem = availableProducts.find(item => item.id === currentProduct.id);

    if (isLoaded && catalog.length !== 0) {
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
                          null }
                        </p>
                        }
                        <Attributes
                          currentAddedProduct={ currentAddedProduct }
                          attributes={ currentProduct.attributes[0] }
                          addedProductAttributes={ currentAddedProduct ? currentAddedProduct.firstAttr : undefined }
                          addAttrFnGeneral={ this.addAttrFnGeneral }
                          addAttrFnCurrent={this.props.addFirstAttribute}
                        />
                        { currentProduct.attributes[1] &&
                        <p className="product-sizes-title">
                          { currentProduct.attributes[1].length !== 0 ?
                          currentProduct.attributes[1].name.toUpperCase() + ":" :
                          null }
                        </p>
                        }
                        <Attributes
                          currentAddedProduct={ currentAddedProduct }
                          attributes={ currentProduct.attributes[1] }
                          addedProductAttributes={ currentAddedProduct ? currentAddedProduct.secondAttr : undefined }
                          addAttrFnGeneral={ this.addAttrFnGeneral }
                          addAttrFnCurrent={this.props.addSecondAttribute}
                        />
                        { currentProduct.attributes[2] &&
                        <p className="product-sizes-title">
                          { currentProduct.attributes[2].length !== 0 ?
                          currentProduct.attributes[2].name.toUpperCase() + ":" :
                          null }
                        </p>
                        }
                        <Attributes
                          currentAddedProduct={ currentAddedProduct }
                          attributes={ currentProduct.attributes[2] }
                          addedProductAttributes={ currentAddedProduct ? currentAddedProduct.thirdAttr : undefined }
                          addAttrFnGeneral={ this.addAttrFnGeneral }
                          addAttrFnCurrent={this.props.addThirdAttribute}
                        />
                      </div>
                    </> : null
                  }
                  <p className="product-price-title">PRICE:</p>
                  <p className="product-price">{ currency } { currentProduct.prices.filter(current => current.currency.symbol === currency)[0].amount }</p>
                  { addedItems.find(item => item.id === currentProduct.id) === undefined ?
                    <div className="btn-toolkit-wrapper">
                      <button
                        className={ availableItem ?? availableItem !== undefined ? "prod-page-add-btn" : "unavailable-add-btn" }
                        onClick={ availableItem !== undefined ? () => this.addItemToCart(this.props.match.params.id) : null }>ADD TO CART
                      </button>
                      { availableItem === undefined ? <span className="tooltiptext-prod-page">Is unavailable now</span> : null }
                    </div> :
                    <button
                      className="prod-page-add-btn"
                      onClick={ availableItem !== undefined ? () => this.removeItemFromCart(this.props.match.params.id) : null }>REMOVE FROM CART
                    </button>
                  }
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
  shopData: PropTypes.object,
  addedItems: PropTypes.array,
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
    addedItems: state.addedItems,
    availableProducts: state.availableProducts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
    removeItem: (id) => {
      dispatch(removeItem(id));
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
