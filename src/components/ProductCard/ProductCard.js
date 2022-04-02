import React, { Component } from "react";
import "./product-card.css";

export default class ProductCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {image, name, amount, currency } = this.props

    return (
      <>
        <div className="product-card-wrapper">
          <img className="product-card-img" loading="lazy" src={image} alt={name}></img>
          <span>{name}</span>
          <span>{amount} {currency}</span>
          <div className="add-to-cart-btn"></div>
        </div>
      </>
    )
  }
}
