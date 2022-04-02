import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartMini from "../Cart/CartMini";
import "./header.css";

export default class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      isCartVisible: false
    };
    this.setCartVisible = this.setCartVisible.bind(this)
  }

  setCartVisible(e) {
    this.setState({
      isCartVisible: !this.state.isCartVisible
    });
    this.props.setBlur()
  }

  render() {
    const { setCategoryName, setCurrency } = this.props;

    return (
      <header className="header-wrapper">
        <div>
          <nav onClick={(event) => {setCategoryName(event.target.textContent)}}>ALL</nav>
          <nav onClick={(event) => {setCategoryName(event.target.textContent)}}>CLOTHES</nav>
          <nav onClick={(event) => {setCategoryName(event.target.textContent)}}>TECH</nav>
        </div>
        <Link to="/"><span className="logo"></span></Link>
        <div>
          <select>
            {this.props.symbols.map(item =>
              <option
                onClick={(event) => {setCurrency(event.target.value)}}
                key={item.currency.symbol}
                value={item.currency.symbol} >
                {item.currency.symbol}
              </option>)
            }
          </select>
          <div className="cart" onClick={this.setCartVisible}></div>
        </div>
        <CartMini isCartVisible={this.state.isCartVisible} setCartVisible={this.setCartVisible}/>
      </header>
    )
  }
}
