import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CartMiniAttributes extends Component {
  render() {
    const { attr, currentAttributes } = this.props;

    return (
      <>
        <p className="item-attribute-name">{ currentAttributes.name }:</p>
        <div className="item-attributes-wrapper">
          { currentAttributes.items.map(item =>
            <div
              className="item-color-size-wrapper"
              key={ item.value }
            >
              <div
                className={ currentAttributes.items.find(el => el.value === item.value) !== undefined &&
                  attr[0].includes("#") && attr.includes(item.value) ? "cart-mini-selected-color" :
                  currentAttributes.items.find(el => el.value === item.value) !== undefined &&
                    !attr[0].includes("#") && attr.includes(item.value) ? "cart-mini-selected-size" :
                    currentAttributes.items.find(el => el.value === item.value) !== undefined &&
                      attr[0].includes("#") && !attr.includes(item.value) ? "cart-mini-unselected-color" :
                      "cart-mini-unselected-size"
                }
                style={ { backgroundColor: item.value } }>
                { !attr[0].includes("#") ? item.value.substring(0, 3) : null }
              </div>
            </div>) }
        </div>
      </>
    );
  }
}

CartMiniAttributes.propTypes = {
  currentItem: PropTypes.object,
  currentAddedProduct: PropTypes.array,
  currentAttributes: PropTypes.object,
  attr: PropTypes.array
};
