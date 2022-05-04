import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CartAttributes extends Component {
  render() {
    const { attr, currentAttributes } = this.props;

    return (
      <> { currentAttributes &&
        <>
          <p className="cart-item-attribute-name">{ currentAttributes.name.toUpperCase() + ":" }</p>
          <div className="cart-item-attributes-wrapper">
            { currentAttributes === undefined ? null : currentAttributes.items.map(item =>
              <div
                className={ currentAttributes.items.find(el => el.id === item.id) !== undefined &&
                    item.value.includes("#") && attr.includes(item.id) ? "cart-item-color-size-wrapper" : null }
                key={ item.value }
              >
                <div className={ currentAttributes.items.find(el => el.id === item.id) !== undefined &&
                    item.value.includes("#") && attr.includes(item.id) ? "cart-selected-color-wrapper" : null }>
                  <div
                    className={ currentAttributes.items.find(el => el.id === item.id) !== undefined &&
                    item.value.includes("#") && attr.includes(item.id) ? "cart-selected-color" :
                      currentAttributes.items.find(el => el.id === item.id) !== undefined &&
                      !item.value.includes("#") && attr === item.id ? "cart-selected-size" :
                        currentAttributes.items.find(el => el.id === item.id) !== undefined &&
                        item.value.includes("#") && !attr.includes(item.id) ? "cart-unselected-color" :
                          "cart-unselected-size"
                    }
                    style={ { backgroundColor: item.value } }>
                    { !item.value.includes("#") ? item.value : null }
                  </div>
                </div>
              </div>) }
          </div>
        </>
      }
      </>
    );
  }
}

CartAttributes.propTypes = {
  currentAttributes: PropTypes.object,
  attr: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
};
