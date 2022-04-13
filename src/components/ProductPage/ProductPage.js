import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import Attributes from "../Attributes/Attributes";
import { addToCart, removeItem, addFirstAttribute, addSecondAttribute, addThirdAttribute } from "../../actions/cart";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
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
    this.addFirstAttr = this.addFirstAttr.bind(this);
    this.addSecondAttr = this.addSecondAttr.bind(this);
    this.addThirdAttr = this.addThirdAttr.bind(this);
  };

  addItemToCart = (id) => {
    this.props.addToCart(id);
  };

  removeItemFromCart = (id) => {
    this.props.removeItem(id);
  };

  addFirstAttr = (event, id) => {
    this.props.addFirstAttribute(id);
    if (!id.includes("#") && event.target.classList.contains("size")) {
      event.target.classList.toggle("selected-size")
    } else {
      event.target.classList.toggle("selected-color")
    }
  };

  addSecondAttr = (event, id) => {
    this.props.addSecondAttribute(id);
    if (!id.includes("#") && event.target.classList.contains("size")) {
      event.target.classList.toggle("selected-size")
    } else {
      event.target.classList.toggle("selected-color")
    }
  };

  addThirdAttr = (event, id) => {
    this.props.addThirdAttribute(id);
    if (!id.includes("#") && event.target.classList.contains("size")) {
      event.target.classList.toggle("selected-size")
    } else {
      event.target.classList.toggle("selected-color")
    }
  };

  setBlur = () => {
    this.setState({
      isBackgroundBlur: !this.state.isBackgroundBlur
    });
  };

  createMarkup(value) {
    return { __html: value };
  };

  componentDidMount() {
    this.setState({
      isLoaded: true
    });
  };

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
          <Link to="/"><span className="homelink">HOMEPAGE</span></Link>
          <section style={ isBackgroundBlur ? styles.ProductPageWrapperBlur : styles.ProductPageWrapper }>
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
                    slidesPerView={ 1 }
                    loop={ true }
                    mousewheel={ true }
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
                      { currentProduct.attributes[0] && <p className="product-sizes-title">{ currentProduct.attributes[0].length !== 0 ? currentProduct.attributes[0].name.toUpperCase() + ":" : null }</p>}
                      <Attributes
                        attributes={ currentProduct.attributes[0] }
                        currentAddedProduct={ currentAddedProduct }
                        currentProduct={ currentProduct }
                        addAttr={ this.addFirstAttr }
                        attr={ currentAddedProduct ? currentAddedProduct.firstAttr : undefined }
                      />
                      { currentProduct.attributes[1] && <p className="product-sizes-title">{ currentProduct.attributes[1].length !== 0 ? currentProduct.attributes[1].name.toUpperCase() + ":" : null }</p>}
                      <Attributes
                        attributes={ currentProduct.attributes[1] }
                        currentAddedProduct={ currentAddedProduct }
                        currentProduct={ currentProduct }
                        addAttr={ this.addSecondAttr }
                        attr={ currentAddedProduct ? currentAddedProduct.secondAttr : undefined }
                      />
                      { currentProduct.attributes[2] && <p className="product-sizes-title">{ currentProduct.attributes[2].length !== 0 ? currentProduct.attributes[2].name.toUpperCase() + ":" : null }</p>}
                      <Attributes
                        attributes={ currentProduct.attributes[2] }
                        currentAddedProduct={ currentAddedProduct }
                        currentProduct={ currentProduct }
                        addAttr={ this.addThirdAttr }
                        attr={ currentAddedProduct ? currentAddedProduct.thirdAttr : undefined }
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
  addToCart: PropTypes.func,
  currency: PropTypes.string,
  addedItems: PropTypes.array,
  removeItem: PropTypes.func,
  addFirstAttribute: PropTypes.func,
  addSecondAttribute: PropTypes.func,
  addThirdAttribute: PropTypes.func,
  availableProducts: PropTypes.array
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
