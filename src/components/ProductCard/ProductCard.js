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
    const { image, name, amount, currency, id, addedItems } = this.props;

    return (
      <>
        <div className="product-card-wrapper">
          <Link to={ `id=${ id }` }>
            <img className="product-card-img" src={ image } alt={ name } />
          <span>{ name }</span>
          <span>{ amount } { currency }</span>
          </Link>
          { addedItems.find(item => item.id === id) === undefined ?
            <div className="add-to-cart-btn" onClick={ () => this.addItemToCart(id) }></div> :
            <div className="remove-from-cart-btn" onClick={ () => this.removeItemFromCart(id) }></div>
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
  addedItems: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
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
