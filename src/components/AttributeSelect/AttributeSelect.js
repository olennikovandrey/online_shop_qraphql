import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Attributes from "../Attributes/Attributes";
import { addToCart, addFirstAttribute, addSecondAttribute, addThirdAttribute } from "../../actions/cart";
import "./attribute-select.css";

class AttributeSelect extends Component {
  constructor(props) {
    super(props);
  }

  addItemToCart = (id) => {
    this.props.addToCart(id);
    this.props.attributeSelectVisible();
  };

  addAttrFnGeneral = (event, id, addFunction) => {
    addFunction(id);
    if (!id.includes("#") && event.target.classList.contains("size")) {
      event.target.classList.toggle("selected-size");
    } else if (id.includes("#") && event.target.classList.contains("size")) {
      event.target.classList.toggle("selected-color");
    } else if (event.target.classList.contains("disabled-size") ||
               event.target.classList.contains("selected-size") ||
               event.target.classList.contains("selected-color") ||
               event.target.classList.contains("disabled-color")) {
      return
    }
  };

  render() {
    const { id, addedItems, addFirstAttribute, addSecondAttribute, addThirdAttribute, attributeSelectVisible } = this.props,
          catalog = JSON.parse(localStorage.getItem("shopData")),
          currentProduct = catalog[0].products.filter(item => item.id === id)[0],
          currentAddedProduct = addedItems.filter( el => el.id === id)[0];

    return (
      <div className="attribute-select-wrapper">
        <div className="row-wrapper">
          <p className="attribute-select-title">SELECT ATTRIBUTES:</p>
          <span className="close-btn" onClick={ () => attributeSelectVisible() }></span>
        </div>

        { currentProduct.attributes ?
          <div className="available-sizes-wrapper">
            <p className="product-sizes-title">
              { currentProduct.attributes.length !== 0 ?
              currentProduct.attributes[0].name.toUpperCase() + ":" :
              null }
            </p>
            <Attributes
              currentAddedProduct={ currentAddedProduct }
              attributes={ currentProduct.attributes[0] }
              addedProductAttributes={ currentAddedProduct ? currentAddedProduct.firstAttr : undefined }
              addAttrFnGeneral={ this.addAttrFnGeneral }
              addAttrFnCurrent={ addFirstAttribute }
            />
            { currentProduct.attributes[1] &&
            <p className="product-sizes-title">
              { currentProduct.attributes[1].length !== 0 ?
              currentProduct.attributes[1].name.toUpperCase() + ":" :
              null }
            </p>
            }
            <Attributes
              currentAddedProduct={ currentAddedProduct }
              attributes={ currentProduct.attributes[1] }
              addedProductAttributes={ currentAddedProduct ? currentAddedProduct.secondAttr : undefined }
              addAttrFnGeneral={ this.addAttrFnGeneral }
              addAttrFnCurrent={ addSecondAttribute }
            />
            { currentProduct.attributes[2] &&
            <p className="product-sizes-title">
              { currentProduct.attributes[2].length !== 0 ?
              currentProduct.attributes[2].name.toUpperCase() + ":" :
              null }
            </p>
            }
            <Attributes
              currentAddedProduct={ currentAddedProduct }
              attributes={ currentProduct.attributes[2] }
              addedProductAttributes={ currentAddedProduct ? currentAddedProduct.thirdAttr : undefined }
              addAttrFnGeneral={ this.addAttrFnGeneral }
              addAttrFnCurrent={ addThirdAttribute }
            />
          </div> :
          null
        }
        { currentProduct  ?
        <button
          className="attr-select-add-btn"
          onClick={ () => this.addItemToCart(id) }>ADD TO CART
        </button> : null
        }
      </div>
    );
  }
}

AttributeSelect.propTypes = {
  id: PropTypes.string,
  addedItems: PropTypes.array,
  addToCart: PropTypes.func,
  addFirstAttribute: PropTypes.func,
  addSecondAttribute: PropTypes.func,
  addThirdAttribute: PropTypes.func,
  attributeSelectVisible: PropTypes.func
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
