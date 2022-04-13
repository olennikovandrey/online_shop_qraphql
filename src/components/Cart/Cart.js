import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import CartItem from "./CartItem";
import "./styles/cart.css";
import "./styles/swiper.css"

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
    const { totalPrice, currency, bagQuantity, addedItems } = this.props;

    return (
      <>
        <Header setBlur={this.setBlur} />
        {addedItems.length > 0 ?
          <section
          style={ this.state.isBackgroundBlur ? { filter: "brightness(0.8) blur(1px)" } : null }
          className="cart-wrapper">
            <Link to="/"><span className="homelink">HOMEPAGE</span></Link>
            <h2>CART, { bagQuantity } { bagQuantity === 1 ? "item" : "items" } </h2>
            {addedItems.map( item =>
              <CartItem
                key={item.id}
                id={item.id}
              />)
            }
            <div className="row-wrapper">
              <h2>Total</h2>
              <h2>{ currency } { totalPrice }</h2>
            </div>
            <button className="cart-check-out-btn">CHECK OUT</button>
          </section> :
          <section className="cart-wrapper">
            <h2>YOU HAVEN'T ADDED ANY ITEMS TO YOUR CART YET</h2>
          </section>
        }
      </>
    );
  }
}

Cart.propTypes = {
  addedItems: PropTypes.array,
  currency: PropTypes.string
};


const mapStateToProps = (state) => {
  return {
    bagQuantity: state.addedItems.length,
    addedItems: state.addedItems,
    currency: state.currency,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps, null)(Cart);
