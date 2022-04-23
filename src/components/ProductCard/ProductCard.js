import AttributeSelect from "../AttributeSelect/AttributeSelect";
import { addToCart } from "../../actions/cart";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./product-card.css";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAtrributeSelectVisible: false,
      isCardBlur: false
    };
    this.attributeSelectVisible = this.attributeSelectVisible.bind(this);
  }

  attributeSelectVisible = () => {
    this.setState({
      isAtrributeSelectVisible: !this.state.isAtrributeSelectVisible,
      isCardBlur: !this.state.isCardBlur,
    });
  };

  addItemToCart = (payload) => {
    this.props.addToCart(payload);
  };

  render() {
    const { image, name, brand, amount, currency, id, availableProducts, shopData } = this.props,
      currentProduct = shopData[0].products.filter(item => item.id === id)[0],
      available = availableProducts.find(item => item.id === id),
      currentProductAttributes = shopData[0].products.filter(item => item.id === id)[0].attributes;

    return (
      <>
        <div className={ this.state.isCardBlur ? "product-card-wrapper-blur" : "product-card-wrapper" }>
          <Link to={ `id=${ id }` }>
            <img className="product-card-img" src={ image } alt={ name } height="350" width="338" />
            <span className="product-card-name">{brand} { name }</span>
            <span className="product-card-price">{ amount } { currency }</span>
          </Link>
          <div
            className={ available !== undefined ? "add-to-cart-btn" : "add-to-cart-unavailable" }
            onClick={ available !== undefined && currentProductAttributes.length !== 0 ? () => this.attributeSelectVisible() :
              available === undefined ? null :
                () => this.addItemToCart(currentProduct)
            }
          >
            { available !== undefined ? null : <span className="out-label">Out of stock</span> }
          </div>
          { this.state.isAtrributeSelectVisible ?
            <AttributeSelect
              id={ id }
              attributeSelectVisible={ this.attributeSelectVisible }
            /> : null
          }
        </div>
      </>
    );
  }
}

ProductCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  brand: PropTypes.string,
  amount: PropTypes.number,
  currency: PropTypes.string,
  id: PropTypes.string,
  addToCart: PropTypes.func,
  removeItem: PropTypes.func,
  availableProducts: PropTypes.array,
  shopData: PropTypes.array
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
