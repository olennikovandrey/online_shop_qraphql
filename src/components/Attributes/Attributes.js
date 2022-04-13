import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Attributes extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { attributes, addAttr, currentAddedProduct, attr } = this.props;
    console.log(attr)

    return (
      <>
        <div className="available-items-wrapper">{ attributes ? attributes.items.map(
          item =>
            <div
              key={ item.id }
              className={
                currentAddedProduct === undefined ? "size" :
                  attr[0][0] === "#" && attr.includes(item.value) ? "selected-color" :
                    attr.includes(item.value) ? "selected-size" : "size"
              }
              style={ { background: item.value } }
              onClick={ (event) => addAttr(event, item.value) }>
              { !item.value.includes("#") ? item.value : null }
            </div>
          )
          : null
        }
        </div>
      </>
    )
  }
}

Attributes.propTypes = {
  addAttr: PropTypes.func,
  attributes: PropTypes.object,
  currentAddedProduct: PropTypes.object,
  currentProduct: PropTypes.object,
  addedItems: PropTypes.object
};
