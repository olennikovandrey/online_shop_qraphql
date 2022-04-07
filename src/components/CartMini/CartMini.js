import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CartMiniItem from "./CartMiniItem";
import "./cart-mini.css";

class CartMini extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isCartVisible, setCartVisible, setBlur, totalPrice, addedItems, currency, bagQuantity } = this.props;

    return (
      <>
        <div className={ isCartVisible ? "cart-mini-wrapper" : "hidden" } >
          <div className="row-wrapper">
            <span className="cart-mini-title"><b>My Bag</b>, { bagQuantity } items</span>
            <span className="close-btn" onClick={ setCartVisible }></span>
          </div>
          {addedItems.map( item =>
            <CartMiniItem
              key={item.id}
              id={item.id}
              setBlur={setBlur}
            />)
          }
          <div className="row-wrapper">
            <span className="total-price-title">Total</span>
            <span className="total-price-value">{ currency } { totalPrice }</span>
          </div>
          <div className="bts-wrapper">
            <button className="view-bag-btn"><Link to="/cart">VIEW BAG</Link></button>
            <button className="check-out-btn">CHECK OUT</button>
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
  addedItems: PropTypes.array,
  symbols: PropTypes.array,
  bagQuantity: PropTypes.number,
  currency: PropTypes.string,
  totalPrice: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    bagQuantity: state.addedItems.length,
    addedItems: state.addedItems,
    currency: state.currency,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps, null)(CartMini);
