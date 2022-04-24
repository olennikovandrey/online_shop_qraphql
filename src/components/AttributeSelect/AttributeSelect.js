import Attributes from "../Attributes/Attributes";
import { addToCart, addFirstAttribute, addSecondAttribute, addThirdAttribute } from "../../actions/cart";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./attribute-select.css";

class AttributeSelect extends Component {

  addItemToCart = (payload) => {
    this.props.addToCart(payload);
    this.props.attributeSelectVisible();
  };

  addAttrFnGeneral = (id, addFunction) => {
    addFunction(id);
  };

  render() {
    const { id, addFirstAttribute, addSecondAttribute, addThirdAttribute, attributeSelectVisible } = this.props,
      catalog = JSON.parse(localStorage.getItem("shopData")),
      currentProductUnfreeze = Object.assign( {}, catalog[0].products.filter(item => item.id === id)[0]),
      currentProduct = { ...currentProductUnfreeze, firstAttr: [], secondAttr: [], thirdAttr: [], workID: "" };
    console.log({currentProduct});

    return (
      <div className="attribute-select-wrapper">
        <div className="row-wrapper">
          <p className="attribute-select-title">SELECT ATTRIBUTES:</p>
          <span className="close-btn" onClick={ () => attributeSelectVisible() }></span>
        </div>

        { currentProduct.attributes ?
          <div className="available-sizes-wrapper">
            <p className="product-sizes-title">
              { currentProduct.attributes[0].length !== 0 ?
                currentProduct.attributes[0].name.toUpperCase() + ":" :
                null
              }
            </p>
            <div className="first-attr-parent">
              <Attributes
                attributes={ currentProduct.attributes[0] }
                addAttrFnGeneral={ this.addAttrFnGeneral }
                addAttrFnCurrent={ addFirstAttribute }
                parentClass={".first-attr-parent"}
              />
            </div>
            { currentProduct.attributes[1] &&
            <p className="product-sizes-title">
              { currentProduct.attributes[1].length !== 0 ?
                currentProduct.attributes[1].name.toUpperCase() + ":" :
                null
              }
            </p>
            }
            <div className="second-attr-parent">
              <Attributes
                attributes={ currentProduct.attributes[1] }
                addAttrFnGeneral={ this.addAttrFnGeneral }
                addAttrFnCurrent={ addSecondAttribute }
                parentClass={".second-attr-parent"}
              />
            </div>
            { currentProduct.attributes[2] &&
            <p className="product-sizes-title">
              { currentProduct.attributes[2].length !== 0 ?
                currentProduct.attributes[2].name.toUpperCase() + ":" :
                null
              }
            </p>
            }
            <div className="third-attr-parent">
              <Attributes
                attributes={ currentProduct.attributes[2] }
                addAttrFnGeneral={ this.addAttrFnGeneral }
                addAttrFnCurrent={ addThirdAttribute }
                parentClass={".third-attr-parent"}
              />
            </div>
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
