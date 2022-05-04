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
            <div key={ item.id } className={ item.value.includes("#") ? "color-wrapper" : null }>
              <div
                value={ item.value }
                className={ item.value.includes("#") ? "color" : "size" }
                style={ { background: item.value } }
                onClick={ () => addAttribute(item.id) }>
                { !item.value.includes("#") ? item.value : null }
              </div>
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
