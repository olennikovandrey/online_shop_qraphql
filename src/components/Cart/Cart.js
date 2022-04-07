import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../Header/Header";
import CartItem from "./CartItem";
import "./styles/cart.css";
import "./styles/swiper.css"

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Header />
        <section className="cart-wrapper">
          <span className="cart-title">CART</span>
            {this.props.addedItems.map( item =>
              <CartItem
                key={item.id}
                id={item.id}
              />)
            }
        </section>
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
    addedItems: state.addedItems,
    currency: state.currency
  };
};

export default connect(mapStateToProps, null)(Cart);
