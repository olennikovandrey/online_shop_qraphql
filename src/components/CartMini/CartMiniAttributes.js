import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CartMiniAttributes extends Component {
  render() {
    const { attr, currentAttributes } = this.props;

    return (
      <>
        { currentAttributes &&
        <>
          <p className="item-attribute-name">{ currentAttributes.name + ":" }</p>
          <div className="item-attributes-wrapper">
            { currentAttributes === undefined ? null : currentAttributes.items.map(item =>
              <div
                className="item-color-size-wrapper"
                key={ item.value }
              >
                <div className={ currentAttributes.items.find(el => el.id === item.id) !== undefined &&
                    item.value.includes("#") && attr.includes(item.id) ? "cart-mini-selected-color-wrapper" : null }>
                  <div
                    className={ currentAttributes.items.find(el => el.id === item.id) !== undefined &&
                    item.value.includes("#") && attr.includes(item.id) ? "cart-mini-selected-color" :
                      currentAttributes.items.find(el => el.id === item.id) !== undefined &&
                      !item.value.includes("#") && attr === item.id ? "cart-mini-selected-size" :
                        currentAttributes.items.find(el => el.id === item.id) !== undefined &&
                        item.value.includes("#") && !attr.includes(item.id) ? "cart-mini-unselected-color" :
                          "cart-mini-unselected-size"
                    }
                    style={ { backgroundColor: item.value } }>
                    { !item.value.includes("#") ? item.value.substring(0, 3) : null }
                  </div>
                </div>
              </div>)
            }
          </div>
        </>
        }
      </>
    );
  }
}

CartMiniAttributes.propTypes = {
  currentAttributes: PropTypes.object,
  attr: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
};
