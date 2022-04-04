import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./page-not-found.css"

export default class PageNotFound extends Component {
  render() {
    return (
      <div className="page-not-found-wrapper">
        <span>404</span>
        <span>Page Not Found</span>
        <span><Link to="/">Go back</Link></span>
      </div>
    )
  }
}
