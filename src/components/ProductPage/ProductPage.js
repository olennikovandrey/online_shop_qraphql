import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import { addToCart, removeItem, addFirstAttribute } from "../../actions/cart";
import { styles } from "../../assets/styles/styles";
import "./product-page.css";


class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isBackgroundBlur: false
    };
    this.setBlur = this.setBlur.bind(this);
  }

  addItemToCart = (id) => {
    this.props.addToCart(id);
  };

  removeItemFromCart = (id) => {
    this.props.removeItem(id);
  };

  addFirstAttr = (id) => {
    this.props.addFirstAttribute(id);
  }

  setBlur() {
    this.setState({
      isBackgroundBlur: !this.state.isBackgroundBlur
    });
  }

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
          { currency, addedItems, catalog, availableProducts } = this.props,
          product = catalog[0].products.filter(item => item.id === this.props.match.params.id),
          currentProduct = product[0],
          available = availableProducts.find(item => item.id === currentProduct.id);

    if (isLoaded && catalog.length !== 0) {
      return (
        <>
          <Header
            setCategoryName={ null }
            setBlur={ this.setBlur }
          />
          <section style={ isBackgroundBlur ? styles.ProductPageWrapperBlur : styles.ProductPageWrapper }>
            <div className="preview-img-wrapper">
              { currentProduct.gallery.slice(1, 6).map(
                item =>
                  <img className="preview-img" src={ item } width="80" height="auto" alt={ currentProduct.name } key={item.index}/>
                )
              }
            </div>
            <div className="product-info">
              <div className="product-img-wrapper">
                <img className="product-img" src={ currentProduct.gallery[0] } alt={ currentProduct.name } />
              </div>
              <div className="product-details">
                <p className="product-name">{ currentProduct.brand }</p>
                <p className="product-brief-description">{ currentProduct.name }</p>
                { currentProduct.attributes ?
                  <div className="available-sizes-wrapper">
                    <p className="product-sizes-title">{ currentProduct.attributes.length !== 0 ? currentProduct.attributes[0].name.toUpperCase() + ":" : null}</p>
                    <div className="available-items-wrapper">{ currentProduct.attributes[0] ? currentProduct.attributes[0].items.map(
                      item =>
                        <div
                        className="size"
                        style={ { background: item.value } }
                        key={item.id}
                        onClick={() => this.addFirstAttr(item.id)}>
                          { currentProduct.attributes[0].name.toLowerCase() !== "color" ? item.value : null }
                        </div>)
                      : null
                    }
                    </div>
                    { currentProduct.attributes[1] && <p className="product-sizes-title">{ currentProduct.attributes[1].name.toUpperCase() + ":" }</p>}
                    <div className="available-items-wrapper">{ currentProduct.attributes[1] ? currentProduct.attributes[1].items.map(
                      item =>
                        <div
                        className="size"
                        style={ { background: item.value } }
                        key={item.id}>
                          { currentProduct.attributes[1].name.toLowerCase() !== "color" ? item.value : null }
                        </div>)
                      : null
                    }
                    </div>
                    { currentProduct.attributes[2] && <p className="product-sizes-title">{ currentProduct.attributes[2].name.toUpperCase() + ":" }</p>}
                    <div className="available-items-wrapper">{ currentProduct.attributes[2] ? currentProduct.attributes[2].items.map(
                      item =>
                        <div className="size" key={item.id}>
                          { currentProduct.attributes[2].name.toLowerCase() !== "color" ? item.value : null }
                        </div>)
                      : null
                    }
                    </div>
                  </div>
                : null }
                <p className="product-price-title">PRICE:</p>
                <p className="product-price">{ currency } { currentProduct.prices.filter(current => current.currency.symbol === currency)[0].amount }</p>
                { addedItems.find(item => item.id === currentProduct.id) === undefined ?
                  <div className="btn-toolkit-wrapper">
                    <button
                      className={ available !== undefined ? "prod-page-add-btn" : "unavailable-add-btn" }
                      onClick={ available !== undefined ? () => this.addItemToCart(this.props.match.params.id) : null }>ADD TO CART
                    </button>
                    { available === undefined ? <span className="tooltiptext-prod-page">Is unavailable now</span> : null }
                  </div> :
                  <button
                    className="prod-page-add-btn"
                    onClick={available !== undefined ? () => this.removeItemFromCart(this.props.match.params.id) : null }>REMOVE FROM CART
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
  catalog: PropTypes.array,
  removeItem: PropTypes.func,
  addFirstAttribute: PropTypes.func,
  availableProducts: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    addedItems: state.addedItems,
    catalog: state.catalog,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
