import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default class Header extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <header className="header-wrapper">
        <div className="header-content-wrapper">
          <nav onClick={(event) => {this.props.setCategoryName(event.target.textContent)}}>ALL</nav>
          <nav onClick={(event) => {this.props.setCategoryName(event.target.textContent)}}>CLOTHES</nav>
          <nav onClick={(event) => {this.props.setCategoryName(event.target.textContent)}}>TECH</nav>
          <Link to="/"><span className="logo"></span></Link>
          <span>$</span>
          <span></span>
          <Link to="/cart"><span className="cart"></span></Link>
        </div>
      </header>
    )
  }
}
