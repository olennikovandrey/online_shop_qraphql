import React, { Component } from "react";
import CartMiniItem from "./CartMiniItem";
import "./cart-mini.css";

export default class CartMini extends Component {
  render() {
    const { isCartVisible, setCartVisible } = this.props;

    return (
      <>
        <div className={isCartVisible ? "cart-mini-wrapper" : "hidden"} >
          <div className="row-wrapper">
            <span className="cart-mini-title"><b>My Bag</b>, {} items</span>
            <span className="close-btn" onClick={setCartVisible}></span>
          </div>
          <CartMiniItem />
          <CartMiniItem />
          <div className="row-wrapper">
            <span className="total-price-title">Total</span>
            <span className="total-price-value">$100.00</span>
          </div>
          <div className="bts-wrapper">
            <button className="view-bag-btn">VIEW BAG</button>
            <button className="check-out-btn">CHECK OUT</button>
          </div>
        </div>
      </>
    )
  }
}
