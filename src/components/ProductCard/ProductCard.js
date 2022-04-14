import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AttributeSelect from "../AttributeSelect/AttributeSelect";
import { addToCart, removeItem } from "../../actions/cart";
import "./product-card.css";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAtrributeSelectVisible: false,
      isCardBlur: false
    };
    this.attributeSelectVisible = this.attributeSelectVisible.bind(this);
  }

  attributeSelectVisible = () => {
    this.setState({
      isAtrributeSelectVisible: !this.state.isAtrributeSelectVisible,
      isCardBlur: !this.state.isCardBlur,
    });
  };

  addItemToCart = (id) => {
    this.props.addToCart(id);
  };

  removeItemFromCart = (id) => {
    this.props.removeItem(id);
  };

  render() {
    const { image, name, amount, currency, id, availableProducts, addedItems, shopData } = this.props,
          available = availableProducts.find(item => item.id === id),
          currentProductAttributes = shopData[0].products.filter(item => item.id === id)[0].attributes;

    return (
      <>
        <div className={ this.state.isCardBlur ? "product-card-wrapper-blur" : "product-card-wrapper" }>
          <Link to={ `id=${ id }` }>
            <img className="product-card-img" src={ image } alt={ name } height="350" width="338" />
            <span className="product-card-name">{ name }</span>
            <span className="product-card-price">{ amount } { currency }</span>
          </Link>
          { addedItems.find(item => item.id === id) === undefined ?
            <div
              className={ available !== undefined ? "add-to-cart-btn" : "add-to-cart-unavailable" }
              onClick={ available !== undefined && currentProductAttributes.length !== 0 ? () => this.attributeSelectVisible() : () => this.addItemToCart(id) }
            >
              <span className="tooltiptext">Is unavailable now</span>
            </div> :
            <div
              className="remove-from-cart-btn"
              onClick={ () => this.removeItemFromCart(id) }
            />
          }
          {this.state.isAtrributeSelectVisible ?
          <AttributeSelect
            id={ id }
            attributeSelectVisible={ this.attributeSelectVisible }
          /> : null }
        </div>
      </>
    );
  }
}

ProductCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  amount: PropTypes.number,
  currency: PropTypes.string,
  id: PropTypes.string,
  addToCart: PropTypes.func,
  removeItem: PropTypes.func,
  availableProducts: PropTypes.array,
  addedItems: PropTypes.array,
  shopData: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    availableProducts: state.availableProducts,
    addedItems: state.addedItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
    removeItem: (id) => {
      dispatch(removeItem(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
