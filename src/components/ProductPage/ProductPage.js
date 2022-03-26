import React, { Component } from "react";
import Header from "../Header/Header";
import "./product-page.css";


export default class ProductPage extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="product-page-wrapper">
          <div className="preview-img-wrapper">
            <img className="preview-img" src="" width="80" height="80" alt=""/>
            <img className="preview-img" src="" width="80" height="80" alt=""/>
            <img className="preview-img" src="" width="80" height="80" alt=""/>
          </div>
          <div className="product-info">
            <img className="product-img" src="" width="610" height="511" alt=""/>
            <div className="product-details">
              <p className="product-name">Apollo</p>
              <p className="product-brief-description">Running Short</p>
              <p className="product-sizes-title">SIZE:</p>
              <div className="avail-sizes-wrapper">
                <div className="avail-size">XS</div>
                <div className="avail-size">S</div>
                <div className="avail-size">M</div>
                <div className="avail-size">L</div>
              </div>
              <p className="product-price-title">PRICE:</p>
              <p className="product-price">$50.00</p>
              <button>ADD TO CART</button>
              <span className="product-description">Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.</span>
            </div>

          </div>

        </div>
      </>
    )
  }
}
