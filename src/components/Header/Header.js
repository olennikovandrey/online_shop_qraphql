import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default class Header extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { setCategoryName, setCurrency } = this.props;
    return (
      <header className="header-wrapper">
        <div className="header-content-wrapper">
          <nav onClick={(event) => {setCategoryName(event.target.textContent)}}>ALL</nav>
          <nav onClick={(event) => {setCategoryName(event.target.textContent)}}>CLOTHES</nav>
          <nav onClick={(event) => {setCategoryName(event.target.textContent)}}>TECH</nav>
          <Link to="/"><span className="logo"></span></Link>
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
          <Link to="/cart"><span className="cart"></span></Link>
        </div>
      </header>
    )
  }
}
