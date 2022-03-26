import React, { Component } from "react";
import { Link } from "react-router-dom"
import "./header.css";

export default class Header extends Component {
  render() {
    return (
      <header className="header-wrapper">
        <div className="header-content-wrapper">
          <nav>WOMEN</nav>
          <nav>MEN</nav>
          <nav>KIDS</nav>
          <Link to="/"><span className="logo"></span></Link>
          <span>$</span>
          <span></span>
          <Link to="/cart"><span className="cart"></span></Link>
        </div>
      </header>
    )
  }
}
