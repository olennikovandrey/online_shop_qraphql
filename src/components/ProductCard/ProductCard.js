import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToCart, removeItem } from "../../actions/cart";
import "./product-card.css";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  constructor(props) {
    super(props);
  }

  addItemToCart = (id) => {
    this.props.addToCart(id);
  };

  removeItemFromCart = (id) => {
    this.props.removeItem(id);
  };

  render() {
    const { image, name, amount, currency, id, availableProducts, addedItems } = this.props,
          available = availableProducts.find(item => item.id === id);

    return (
      <>
        <div className="product-card-wrapper">
          <Link to={ `id=${ id }` }>
            <img className="product-card-img" src={ image } alt={ name } />
          <span>{ name }</span>
          <span>{ amount } { currency }</span>
          </Link>
          { addedItems.find(item => item.id === id) === undefined?
            <div
              className={ available !== undefined ? "add-to-cart-btn" : "add-to-cart-unavailable" }
              onClick={ available !== undefined ? () => this.addItemToCart(id) : null }
            >
              <span className="tooltiptext">Is unavailable now</span>
            </div> :
            <div
              className="remove-from-cart-btn"
              onClick={ () => this.removeItemFromCart(id) }
            />
          }
        </div>
      </>
    );
  }
}

ProductCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  amount: PropTypes.number,
  currency: PropTypes.string,
  id: PropTypes.string,
  addToCart: PropTypes.func,
  removeItem: PropTypes.func,
  availableProducts: PropTypes.array,
  addedItems: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    availableProducts: state.availableProducts,
    addedItems: state.addedItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
    removeItem: (id) => {
      dispatch(removeItem(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
