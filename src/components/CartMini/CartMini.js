import CartMiniItem from "./CartMiniItem";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./cart-mini.css";

class CartMini extends Component {
  constructor(props) {
    super(props);
    this.cartMiniCloser = this.cartMiniCloser.bind(this);
  }

  cartMiniCloser(event) {
    if(!event.target.matches(".cart-mini-wrapper, .counter-btn, .remove-item-btn, .cart-mini-wrapper *, .header-wrapper, .currency-select, .currency-select *")) {
      this.props.setCartVisible(event);
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.cartMiniCloser);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.cartMiniCloser);
  }

  render() {
    const { setCartVisible, setBlur, totalPrice, addedItems, currency, totalItemsInCart } = this.props;

    return (
      <>
        <div className="cart-mini-wrapper">
          <div className="row-wrapper">
            <span className="cart-mini-title"><b>My Bag</b>, { totalItemsInCart } { totalItemsInCart === 1 ? "item" : "items" }</span>
            <span className="close-btn" onClick={ setCartVisible }></span>
          </div>
          { addedItems.map( item =>
            <CartMiniItem key={ item.id + item.firstAttr + item.secondAttr + item.thirdAttr }
              finder={ item.id + item.firstAttr + item.secondAttr + item.thirdAttr }
              id={ item.id }
              setBlur={ setBlur }
            />
          )}
          <div className="row-wrapper">
            <span className="total-price-title">Total</span>
            <span className="total-price-value">{ currency } { totalPrice }</span>
          </div>
          <div className="bts-wrapper">
            <button className="view-bag-btn"><Link to="/cart">VIEW BAG</Link></button>
            <button className={ addedItems.length > 0 ? "check-out-btn" : "check-out-btn-disabled" }>CHECK OUT</button>
          </div>
        </div>
      </>
    );
  }
}

CartMini.propTypes = {
  isCartVisible: PropTypes.bool,
  setCartVisible: PropTypes.func,
  setBlur: PropTypes.func,
  totalPrice: PropTypes.number,
  addedItems: PropTypes.array,
  totalItemsInCart: PropTypes.number,
  currency: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    totalItemsInCart: state.totalItemsInCart,
    addedItems: state.addedItems,
    currency: state.currency,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps, null)(CartMini);
