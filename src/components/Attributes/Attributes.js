import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFirstAttribute, addSecondAttribute, addThirdAttribute } from "../../actions/cart";

class Attributes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentAddedProduct, attributes, addedProductAttributes, addAttrFnGeneral, addAttrFnCurrent } = this.props;

    return (
      <>
        <div className="available-items-wrapper">{ attributes ? attributes.items.map(
          item =>
            <div
              key={ item.id }
              className={
                currentAddedProduct === undefined ? "size" :
                  addedProductAttributes[0] && addedProductAttributes[0][0] === "#" && addedProductAttributes.includes(item.value) ? "selected-color" :
                    addedProductAttributes.includes(item.value) ? "selected-size" : "disabled-color"
              }
              style={ { background: item.value } }
              onClick={ (event) => addAttrFnGeneral(event, item.value, addAttrFnCurrent) }>
              { !item.value.includes("#") ? item.value : null }
            </div>
          )
          : null
        }
        </div>
      </>
    );
  }
}

Attributes.propTypes = {
  currentAddedProduct: PropTypes.object,
  attributes: PropTypes.object,
  addedProductAttributes: PropTypes.array,
  addAttrFnGeneral: PropTypes.func,
  addAttrFnCurrent: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
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

export default connect(null, mapDispatchToProps)(Attributes);
