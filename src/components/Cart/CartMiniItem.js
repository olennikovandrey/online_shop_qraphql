import React, { Component } from "react";
import "./cart-mini.css";

export default class CartMiniItem extends Component {
  render() {
    return (
      <div className="cart-mini-item-wrapper">
        <div className="item-description-price-size-wrapper">
          <div>
            <span className="item-description">Apollo</span>
            <span className="item-description">Running Short</span>
          </div>
          <span className="item-price">$50.00</span>
          <div className="item-color-size">S</div>
        </div>
        <div className="item-counter-img-wrapper">
          <div>
            <div className="counter-btn">+</div>
            <span>1</span>
            <div className="counter-btn">-</div>
          </div>
          <img src="" width="105" height="120" alt=""></img>
        </div>
      </div>
    )
  }
}
