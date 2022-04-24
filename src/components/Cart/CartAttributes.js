import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles/cart-attributes.css";

export default class CartAttributes extends Component {
  render() {
    const { attr, currentAttributes } = this.props;

    return (
      <>
        <p className="cart-item-attribute-name">{ currentAttributes.name.toUpperCase() }:</p>
        <div className="cart-item-attributes-wrapper">
          { currentAttributes.items.map(item =>
            <div
              className="cart-item-color-size-wrapper"
              key={ item.value }
            >
              <div
                className={ currentAttributes.items.find(el => el.value === item.value) !== undefined &&
                  attr[0].includes("#") && attr.includes(item.value) ? "cart-selected-color" :
                  currentAttributes.items.find(el => el.value === item.value) !== undefined &&
                    !attr[0].includes("#") && attr.includes(item.value) ? "cart-selected-size" :
                    currentAttributes.items.find(el => el.value === item.value) !== undefined &&
                      attr[0].includes("#") && !attr.includes(item.value) ? "cart-unselected-color" :
                      "cart-unselected-size"
                }
                style={ { backgroundColor: item.value } }>
                { !attr[0].includes("#") ? item.value : null }
              </div>
            </div>) }
        </div>
      </>
    );
  }
}

CartAttributes.propTypes = {
  currentItem: PropTypes.object,
  currentAddedProduct: PropTypes.array,
  currentAttributes: PropTypes.object,
  attr: PropTypes.array
};
