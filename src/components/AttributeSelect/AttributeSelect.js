import Attributes from "../Attributes/Attributes";
import { addToCart } from "../../actions/cart";
import * as functions from "../../services/functions";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./attribute-select.css";

class AttributeSelect extends Component {
  _currentProductUnfreeze = Object.assign( {}, this.props.catalog[0].products.filter(item => item.id === this.props.id)[0]);
  _currentProduct = { ...this._currentProductUnfreeze, firstAttr: [], secondAttr: [], thirdAttr: [], workID: "" };

  constructor(props) {
    super(props);
    this.state = {
      currentProduct: this._currentProduct
    };
    this.addFirstAttribute = this.addFirstAttribute.bind(this);
    this.addSecondAttribute = this.addSecondAttribute.bind(this);
    this.addThirdAttribute = this.addThirdAttribute.bind(this);
  }

  addItemToCart = (payload) => {
    this.props.addToCart(payload);
    this.props.attributeSelectVisible();
  };

  addFirstAttribute = (value) => {
    this._currentProduct.firstAttr = [];
    this.setState({
      currentProduct: { ...this.state.currentProduct, firstAttr: value}
    });
  };

  addSecondAttribute = (value) => {
    this._currentProduct.secondAttr = [];
    this.setState({
      currentProduct: { ...this.state.currentProduct, secondAttr: value}
    });
  };
  addThirdAttribute = (value) => {
    this._currentProduct.thirdAttr = [];
    this.setState({
      currentProduct: { ...this.state.currentProduct, thirdAttr: value}
    });
  };

  render() {
    const { attributeSelectVisible } = this.props,
      { currentProduct } = this.state,
      allAttributes = functions.getAllAttributes(currentProduct.attributes[0], currentProduct.firstAttr,
        currentProduct.attributes[1], currentProduct.secondAttr,
        currentProduct.attributes[2], currentProduct.thirdAttr);

    return (
      <div className="attribute-select-wrapper">
        <div className="row-wrapper">
          <p className="attribute-select-title">SELECT ATTRIBUTES:</p>
          <span className="close-btn" onClick={ () => attributeSelectVisible() }></span>
        </div>

        { this._currentProduct.attributes ?
          <div className="available-sizes-wrapper">
            <p className="product-sizes-title">
              { this._currentProduct.attributes[0].length !== 0 &&
                this._currentProduct.attributes[0].name.toUpperCase() + ":"
              }
            </p>
            <div className="first-attr-parent">
              <Attributes
                attributes={ this._currentProduct.attributes[0] }
                addAttribute={ this.addFirstAttribute }
                parentClass={".first-attr-parent"}
              />
            </div>
            <div className="second-attr-parent">
              <Attributes
                attributes={ this._currentProduct.attributes[1] }
                addAttribute={ this.addSecondAttribute }
                parentClass={".second-attr-parent"}
              />
            </div>
            <div className="third-attr-parent">
              <Attributes
                attributes={ this._currentProduct.attributes[2] }
                addAttribute={ this.addThirdAttribute }
                parentClass={".third-attr-parent"}
              />
            </div>
            { this._currentProduct.attributes[1] &&
            <p className="product-sizes-title">
              { this._currentProduct.attributes[1].length !== 0 &&
                this._currentProduct.attributes[1].name.toUpperCase() + ":"
              }
            </p>
            }

          </div> :
          null
        }
        { this._currentProduct &&
          <button
            className="attr-select-add-btn"
            onClick={ allAttributes ?
              () => this.addItemToCart(currentProduct) : null }>
            { allAttributes ? "ADD TO CART" : "PLEASE, CHOOSE ATTRIBUTES" }
          </button>
        }
      </div>
    );
  }
}

AttributeSelect.propTypes = {
  id: PropTypes.string,
  addedItems: PropTypes.array,
  catalog: PropTypes.array,
  addToCart: PropTypes.func,
  attributeSelectVisible: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    addedItems: state.addedItems,
    catalog: state.catalog
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => {
      dispatch(addToCart(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttributeSelect);
