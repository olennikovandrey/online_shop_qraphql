import * as functions from "../../services/functions";
import React, { Component } from "react";
import PropTypes from "prop-types";


export default class Attributes extends Component {

  componentDidMount() {
    const parent = document.querySelector(this.props.parentClass);
    parent.addEventListener("click", (event) => functions.classChanger(event, parent));
  }

  render() {
    const { attributes, addAttribute, parentClass } = this.props;

    return (
      <>
        <div className={ `attributes-items-wrapper ${ parentClass } `} >{ attributes ? attributes.items.map(
          item =>
            <div
              value={ item.value }
              key={ item.id }
              className="size"
              style={ { background: item.value } }
              onClick={ () => addAttribute(item.id) }>
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
  addAttribute: PropTypes.func,
  parentClass: PropTypes.string
};
