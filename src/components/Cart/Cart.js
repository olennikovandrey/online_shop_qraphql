import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import CartItem from "./CartItem";
import "./styles/cart.css";
import "./styles/swiper.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBackgroundBlur: false
    };
    this.setBlur = this.setBlur.bind(this);
  }

  setBlur() {
    this.setState({
      isBackgroundBlur: !this.state.isBackgroundBlur
    });
  }

  render() {
    const { addedItems, bagQuantity, currency, totalPrice } = this.props;

    return (
      <>
        <Header setBlur={ this.setBlur } />
        { addedItems.length > 0 ?
          <section
          style={ this.state.isBackgroundBlur ? { filter: "brightness(0.8) blur(1px)" } : null }
          className="cart-wrapper">
            <Link to="/">
              <span className="homelink">HOMEPAGE</span>
            </Link>
            <h2>CART, { bagQuantity } { bagQuantity === 1 ? "item" : "items" } </h2>
            { addedItems.map( item =>
              <CartItem
                key={ item.id + item.firstAttr }
                finder={ item.id + item.firstAttr + item.secondAttr + item.thirdAttr }
                id={ item.id }
              />)
            }
            <div className="row-wrapper">
              <h2>Total</h2>
              <h2>{ currency } { totalPrice }</h2>
            </div>
            <button className="cart-check-out-btn">CHECK OUT</button>
          </section> :
          <section className="cart-wrapper">
            <h2>YOU HAVEN&apos;T ADDED ANY ITEMS TO YOUR CART YET</h2>
          </section>
        }
      </>
    );
  }
}

Cart.propTypes = {
  addedItems: PropTypes.array,
  bagQuantity: PropTypes.number,
  currency: PropTypes.string,
  totalPrice: PropTypes.number
};


const mapStateToProps = (state) => {
  return {
    addedItems: state.addedItems,
    bagQuantity: state.addedItems.length,
    totalPrice: state.totalPrice,
    currency: state.currency
  };
};

export default connect(mapStateToProps, null)(Cart);
