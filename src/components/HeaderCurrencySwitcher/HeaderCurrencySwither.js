import * as functions from "../../services/functions";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class HeaderCurrencySwither extends Component {
  render() {
    const { symbols, currency, currencyChanger } = this.props;

    return (
      <>
        <div className="select" data-state="">
          <div
            className="select-title"
            onClick={ () => functions.selectChanger(currencyChanger) }
          >
            { currency }
          </div>
          <div className="select-content">
            { symbols.map(item =>
              <React.Fragment key={ item.symbol }>
                <input id={ item.symbol } className="select-input" type="radio" name="singleSelect" />
                <label
                  htmlFor={ item.symbol }
                  className="select-label"
                >
                  { item.symbol } { item.label }
                </label>
              </React.Fragment>
            ) }
          </div>
        </div>
      </>
    );
  }
}

HeaderCurrencySwither.propTypes = {
  symbols: PropTypes.array,
  currency: PropTypes.string,
  currencyChanger: PropTypes.func
};
