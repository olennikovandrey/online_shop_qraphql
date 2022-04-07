import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./cart-mini.css";

class CartMiniItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { addedItems, id, currency } = this.props;
    const currentItem = addedItems.find(item => id === item.id);

    return (
      <div className="cart-mini-item-wrapper">
        <div className="item-description-price-size-wrapper">
          <div>
            <span className="item-description">{currentItem.brand}</span>
            <span className="item-description">{currentItem.name}</span>
          </div>
          <span className="item-price">{currency} { currentItem.prices.filter(current => current.currency.symbol === currency)[0].amount }</span>
          <div className="item-color-size">S</div>
        </div>
        <div className="item-counter-img-wrapper">
          <div>
            <div className="counter-btn">+</div>
            <span>1</span>
            <div className="counter-btn">-</div>
          </div>
          <Link to={ `id=${ id }` }>
            <img src={currentItem.gallery[0]} width="105" height="120" alt={currentItem.name}></img>
          </Link>
        </div>
      </div>
    );
  }
}

CartMiniItem.propTypes = {
  addedItems: PropTypes.array,
  id: PropTypes.string,
  currency: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    addedItems: state.addedItems,
    currency: state.currency
  };
};

export default connect(mapStateToProps, null)(CartMiniItem);
