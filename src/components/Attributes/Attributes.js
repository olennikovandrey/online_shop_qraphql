import { addFirstAttribute, addSecondAttribute, addThirdAttribute } from "../../actions/cart";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Attributes extends Component {

  componentDidMount() {
    const parent = document.querySelector(this.props.parentClass);

    parent.addEventListener("click", (event) => {
      const target = event.target;
      const attributeItem = parent.querySelectorAll(".size");

      if (target.attributes[0].value.includes("#") && target.classList.contains("size")) {
        for (let i = 0; i < attributeItem.length; i++) {
          attributeItem[i].classList.remove("selected-color");
        }
        target.classList.add("selected-color");
      } else if (target.classList.contains("size")) {
        for (let i = 0; i < attributeItem.length; i++) {
          attributeItem[i].classList.remove("selected-size");
        }
        target.classList.add("selected-size");
      }
    });
  }

  render() {
    const { attributes, addAttrFnGeneral, addAttrFnCurrent, parentClass } = this.props;

    return (
      <>
        <div className={ `available-items-wrapper ${ parentClass } `} >{ attributes ? attributes.items.map(
          item =>
            <div
              value={ item.value }
              key={ item.id }
              className="size"
              style={ { background: item.value } }
              onClick={ () => addAttrFnGeneral(item.value, addAttrFnCurrent ) }>
              { !item.value.includes("#") ? item.value : null }
            </div>
        ) : null
        }
        </div>
      </>
    );
  }
}

Attributes.propTypes = {
  attributes: PropTypes.object,
  addAttrFnGeneral: PropTypes.func,
  addAttrFnCurrent: PropTypes.func,
  parentClass: PropTypes.string
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
