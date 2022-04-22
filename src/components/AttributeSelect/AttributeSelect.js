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

  addItemToCart = (payload) => {
    this.props.addToCart(payload);
    this.props.attributeSelectVisible();
  };

  addAttrFnGeneral = (event, id, addFunction) => {
    addFunction(id);
    if (!id.includes("#") && event.target.classList.contains("size")) {
      event.target.classList.toggle("selected-size");
    } else if (id.includes("#") && event.target.classList.contains("size")) {
      event.target.classList.toggle("selected-color");
    } else if (event.target.classList.contains("selected-size") ||
               event.target.classList.contains("selected-color")) {
      return;
    }
  };

  render() {
    const { id, addFirstAttribute, addSecondAttribute, addThirdAttribute, attributeSelectVisible } = this.props,
          catalog = JSON.parse(localStorage.getItem("shopData")),
          currentProductUnfreeze = Object.assign( {}, catalog[0].products.filter(item => item.id === id)[0]),
          currentProduct = { ...currentProductUnfreeze, firstAttr: [], secondAttr: [], thirdAttr: [], workID: "" };

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
              attributes={ currentProduct.attributes[0] }
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
              attributes={ currentProduct.attributes[1] }
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
              attributes={ currentProduct.attributes[2] }
              addAttrFnGeneral={ this.addAttrFnGeneral }
              addAttrFnCurrent={ addThirdAttribute }
            />
          </div> :
          null
        }
        { currentProduct  ?
        <button
          className="attr-select-add-btn"
          onClick={ () => this.addItemToCart(currentProduct) }>ADD TO CART
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
    addToCart: (payload) => {
      dispatch(addToCart(payload));
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
