import React, { Component } from "react";
import "./product-card.css"

export default class CategoryItem extends Component {
  render() {
    return (
      <div className="product-card-wrapper">
        <img className="product-card-img" width="338px" height="356px" alt=""></img>
        <span>Apollo Running Short</span>
        <span>50.00$</span>
        <div className="add-to-cart-btn"></div>
      </div>
    )
  }
}
