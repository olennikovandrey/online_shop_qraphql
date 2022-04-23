import CartMini from "../CartMini/CartMini";
import client from "../../apollo";
import { changeCurrency, setNewTotalPrice, getCurrency, setCategory } from "../../actions/cart";
import { GET_CURRENCY_CATEGORY } from "../../services/queries";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./header.css";

async function currencyLoader() {
  const { data } = await client.query({query: GET_CURRENCY_CATEGORY} );
  return data;
}

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      isCartVisible: false,
      symbols: [],
      categories: []
    };
    this.setCartVisible = this.setCartVisible.bind(this);
  }

  handleClick = (value) => {
    this.props.changeCurrency(value);
    this.props.setNewTotalPrice(value);
  };

  setCategoryName(value) {
    this.props.setCategory(value);
  }

  setCartVisible(event) {
    event.stopPropagation();
    this.setState({
      isCartVisible: !this.state.isCartVisible
    });
    this.props.setBlur();
  }

  async loadData() {
    const data = await currencyLoader();
    this.setState({
      symbols: data.currencies,
      categories: data.categories
    });
  }

  async componentDidMount() {
    await this.loadData();
  }

  render() {
    const { totalItemsInCart, currency, setBlur } = this.props,
      { symbols, categories } = this.state;

    return (
      <header className="header-wrapper">
        <div>
          { categories.map(item =>
            <nav
              key={ item.name }
              onClick={ (event) => { this.setCategoryName(event.target.textContent); } }
            >
              <Link to="/">{ item.name.toUpperCase() }</Link>
            </nav>
          ) }
        </div>
        <Link to="/"><span className="logo"></span></Link>
        <div>
          <select defaultValue={ currency }>
            { symbols.map(item =>
              <option
                onClick={ (event) => { this.handleClick(event.target.value); } }
                key={ item.symbol }
                value={ item.symbol }
              >
                { item.symbol }
              </option>
            ) }
          </select>
          <div className="cart-icon-wrapper" onClick={ (event) => this.setCartVisible(event) }>
            <span className="cart-icon"></span>
            { totalItemsInCart > 0 && <span className="cart-icon-total">{ totalItemsInCart }</span> }
          </div>
        </div>
        { this.state.isCartVisible ?
          <CartMini
            setCartVisible={ this.setCartVisible }
            setCategoryName={ null }
            setBlur={ setBlur }
          /> : null
        }
      </header>
    );
  }
}

Header.propTypes = {
  setBlur: PropTypes.func,
  setCategoryName: PropTypes.func,
  changeCurrency: PropTypes.func,
  categoryName: PropTypes.string,
  symbols: PropTypes.array,
  totalItemsInCart: PropTypes.number,
  currency: PropTypes.string,
  setNewTotalPrice: PropTypes.func,
  setCategory: PropTypes.func
};

const mapStateToProps = (state) => {

  return {
    totalItemsInCart: state.totalItemsInCart,
    symbols: state.symbols,
    currency: state.currency,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (value) => {
      dispatch(changeCurrency(value));
    },
    setNewTotalPrice: (value) => {
      dispatch(setNewTotalPrice(value));
    },
    getCurrency: (value) => {
      dispatch(getCurrency(value));
    },
    setCategory: (value) => {
      dispatch(setCategory(value));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
