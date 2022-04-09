import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { changeCurrency, setNewTotalPrice } from "../../actions/cart";
import CartMini from "../CartMini/CartMini";
import "./header.css";

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      isCartVisible: false
    };
    this.setCartVisible = this.setCartVisible.bind(this);
  }

  handleClick = (value) => {
    this.props.changeCurrency(value);
    this.props.setNewTotalPrice(value);
  };

  setCartVisible() {
    this.setState({
      isCartVisible: !this.state.isCartVisible
    });
    this.props.setBlur();
  }

  render() {
    const { setCategoryName, setBlur, total, addedItems, currency } = this.props;

    return (
      <header className="header-wrapper">
        <div>
          <nav onClick={ (event) => { setCategoryName(event.target.textContent); } }>ALL</nav>
          <nav onClick={ (event) => { setCategoryName(event.target.textContent); } }>CLOTHES</nav>
          <nav onClick={ (event) => { setCategoryName(event.target.textContent); } }>TECH</nav>
        </div>
        <Link to="/"><span className="logo"></span></Link>
        <div>
          <select value={currency}>
            {this.props.symbols.map(item =>
              <option
                onClick={ (event) => { this.handleClick(event.target.value); } }
                key={ item.currency.symbol }
                value={ item.currency.symbol }
              >
                { item.currency.symbol } { item.currency.label }
              </option>)
            }
          </select>
          <div className="cart-icon-wrapper" onClick={ this.setCartVisible }>
            <span className="cart-icon"></span>
            { total > 0 && <span className="cart-icon-total">{ total }</span> }
          </div>
        </div>
        <CartMini
          isCartVisible={ this.state.isCartVisible }
          setCartVisible={ this.setCartVisible }
          setCategoryName={ null }
          setBlur={ setBlur }
        />
      </header>
    );
  }
}

Header.propTypes = {
  setBlur: PropTypes.func,
  setCategoryName: PropTypes.func,
  changeCurrency: PropTypes.func,
  setNewTotalPrice: PropTypes.setNewTotalPrice,
  categoryName: PropTypes.string,
  symbols: PropTypes.array,
  total: PropTypes.number,
  addedItems: PropTypes.array,
  currency: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    total: state.addedItems.length,
    addedItems: state.addedItems,
    symbols: state.symbols,
    currency: state.currency
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (value) => {
      dispatch(changeCurrency(value));
    },
    setNewTotalPrice: (value) => {
      dispatch(setNewTotalPrice(value));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
