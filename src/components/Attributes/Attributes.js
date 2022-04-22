import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFirstAttribute, addSecondAttribute, addThirdAttribute } from "../../actions/cart";

class Attributes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { attributes, addAttrFnGeneral, addAttrFnCurrent } = this.props;

    return (
      <>
        <div className="available-items-wrapper">{ attributes ? attributes.items.map(
          item =>
            <div
              key={ item.id }
              className="size"
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
  attributes: PropTypes.object,
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
