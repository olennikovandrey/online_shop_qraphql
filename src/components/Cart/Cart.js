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
    return (
      <>
        <Header setBlur={this.setBlur} />
        {this.props.addedItems.length > 0 ?
          <section
          style={ this.state.isBackgroundBlur ? { filter: "brightness(0.8) blur(1px)" } : null }
          className="cart-wrapper">
            <span className="cart-title">CART</span>
            {this.props.addedItems.map( item =>
              <CartItem
                key={item.id}
                id={item.id}
              />)
            }
          </section> :
          <section className="cart-wrapper">
            <span className="cart-title">YOU HAVEN'T ADDED ANY ITEMS TO YOUR CART YET</span>
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
    addedItems: state.addedItems,
    currency: state.currency
  };
};

export default connect(mapStateToProps, null)(Cart);
