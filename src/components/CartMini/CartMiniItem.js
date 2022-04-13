import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addQuantity, removeQuantity, removeItem } from "../../actions/cart";
import { Link } from "react-router-dom";
import { store } from "../../index";
import "./cart-mini.css";

class CartMiniItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.addedItems.find(item => this.props.id === item.id).quantity
    };
    store.subscribe(() => {
      this.setState({
        quantity: this.props.addedItems.find(item => this.props.id === item.id).quantity
      })
    });
  };

  addCurrentQuantity = (id) => {
    this.props.addQuantity(id);
  };

  removeCurrentQuantity = (id) => {
    this.props.removeQuantity(id);
  };

  removeItemFromCart = (id) => {
    this.props.removeItem(id);
  };

  render() {
    const { addedItems, id, currency } = this.props,
          currentItem = addedItems.find(item => id === item.id);

    return (
      <div className="cart-mini-item-wrapper">
        <div className="item-description-price-size-wrapper">
          <div>
            <span className="item-description">{ currentItem.brand }</span>
            <span className="item-description">{ currentItem.name }</span>
          </div>
          <span className="item-price">{ currency } { currentItem.prices.filter(current => current.currency.symbol === currency)[0].amount }</span><br/>
          <div className="sizes-wrapper">
            { currentItem.firstAttr.length > 0 ? <div className="item-color-size">{ currentItem.firstAttr[0].substring(0, 3) }</div>  : null }
            { currentItem.secondAttr.length > 0 ? <div className="item-color-size" style={ { backgroundColor: currentItem.secondAttr[0] } }>
              { !currentItem.secondAttr[0].includes("#") ? currentItem.secondAttr[0] : null }
              </div> : null
            }
            { currentItem.thirdAttr.length > 0  ? <div className="item-color-size">{ currentItem.thirdAttr[0].substring(0, 3) }</div> : null }
          </div>

        </div>
        <div className="item-counter-img-wrapper">
          <div>
            <div className="counter-btn" onClick={ () => this.addCurrentQuantity(id) }>+</div>
            <span>{ this.state.quantity }</span>
            <div className="counter-btn" onClick={ () => this.removeCurrentQuantity(id) }>-</div>
          </div>
          <Link to={ `id=${ id }` }>
            <img
              src={ currentItem.gallery[0] }
              width="105"
              height="120"
              alt={ currentItem.name } />
          </Link>
          <span className="remove-item-btn"
            onClick={ () => this.removeItemFromCart(id) }>
          </span>
        </div>
      </div>
    );
  }
}

CartMiniItem.propTypes = {
  addedItems: PropTypes.array,
  id: PropTypes.string,
  currency: PropTypes.string,
  addQuantity: PropTypes.func,
  removeQuantity: PropTypes.func,
  removeItem: PropTypes.func,
  quantity: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    addedItems: state.addedItems,
    currency: state.currency
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuantity: (id) => {
      dispatch(addQuantity(id));
    },
    removeQuantity: (id) => {
      dispatch(removeQuantity(id));
    },
    removeItem: (id) => {
      dispatch(removeItem(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartMiniItem);
