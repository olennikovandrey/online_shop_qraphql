import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Attributes from "../Attributes/Attributes";
import { addToCart, addFirstAttribute, addSecondAttribute, addThirdAttribute } from "../../actions/cart";
import "./attribute-select.css";

class AttributeSelect extends Component {
  constructor(props) {
    super(props)
  }

  addItemToCart = (id) => {
    this.props.addToCart(id);
    this.props.attributeSelectVisible()
  };

  addFirstAttr = (event, id) => {
    this.props.addFirstAttribute(id);
    if (event.target.classList.contains("size")) {
      event.target.classList.toggle("selected-size")
    }
  };

  addSecondAttr = (event, id) => {
    this.props.addSecondAttribute(id);
    if (!id.includes("#") && event.target.classList.contains("size")) {
      event.target.classList.toggle("selected-size")
    } else {
      event.target.classList.toggle("selected-color")
    }
  };

  addThirdAttr = (event, id) => {
    this.props.addThirdAttribute(id);
    if (!id.includes("#") && event.target.classList.contains("size")) {
      event.target.classList.toggle("selected-size")
    } else {
      event.target.classList.toggle("selected-color")
    }
  };

  render() {
    const catalog = JSON.parse(localStorage.getItem("shopData")),
          { id } = this.props,
          currentProduct = catalog[0].products.filter(item => item.id === id)[0],
          currentAddedProduct = this.props.addedItems.filter( el => el.id === id)[0];

    return (
      <div className="attribute-select-wrapper">
        <div className="row-wrapper">
          <p className="attribute-select-title">SELECT ATTRIBUTES:</p>
          <span className="close-btn" onClick={ () => this.props.attributeSelectVisible() }></span>
        </div>

        { currentProduct.attributes ?
          <div className="available-sizes-wrapper">
            <p className="product-sizes-title">{ currentProduct.attributes.length !== 0 ? currentProduct.attributes[0].name.toUpperCase() + ":" : null}</p>
            <Attributes
              attributes={ currentProduct.attributes[0] }
              currentAddedProduct={ currentAddedProduct }
              currentProduct={ currentProduct }
              addAttr={ this.addFirstAttr }
              attr={ currentAddedProduct ? currentAddedProduct.firstAttr : undefined }
            />
            { currentProduct.attributes[1] && <p className="product-sizes-title">{ currentProduct.attributes[1].length !== 0 ? currentProduct.attributes[1].name.toUpperCase() + ":" : null }</p>}
            <Attributes
              attributes={ currentProduct.attributes[1] }
              currentAddedProduct={ currentAddedProduct }
              currentProduct={ currentProduct }
              addAttr={ this.addSecondAttr }
              attr={ currentAddedProduct ? currentAddedProduct.secondAttr : undefined }
            />
            { currentProduct.attributes[2] && <p className="product-sizes-title">{ currentProduct.attributes[2].length !== 0 ? currentProduct.attributes[2].name.toUpperCase() + ":" : null }</p>}
            <Attributes
              attributes={ currentProduct.attributes[2] }
              currentAddedProduct={ currentAddedProduct }
              currentProduct={ currentProduct }
              addAttr={ this.addThirdAttr }
              attr={ currentAddedProduct ? currentAddedProduct.thirdAttr : undefined }
            />
            </div> : null }
        <button
          className="attr-select-add-btn"
          onClick={ () => this.addItemToCart(id) }>ADD TO CART
        </button>
      </div>
    )
  }
}

AttributeSelect.propTypes = {
  id: PropTypes.string,
  addedItems: PropTypes.array,
  addToCart: PropTypes.func,
  addFirstAttribute: PropTypes.func,
  addSecondAttribute: PropTypes.func,
  addThirdAttribute: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    addedItems: state.addedItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
    addFirstAttribute: (id) => {
      dispatch(addFirstAttribute(id));
    },
    addSecondAttribute: (id) => {
      dispatch(addSecondAttribute(id));
    },
    addThirdAttribute: (id) => {
      dispatch(addThirdAttribute(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttributeSelect);
