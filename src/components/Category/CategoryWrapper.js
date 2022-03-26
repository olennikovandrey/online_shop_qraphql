import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import "./category.css";

export default class CategoryWrapper extends Component {

  render() {
    return (
      <>
        <section className="category-wrapper">
          <span className="category-name">{this.props.categoryName}</span>
          <div className="category-items-wrapper">
            <Link to="/id">
              <ProductCard />
            </Link>
          </div>
        </section>
      </>
    )
  }
}
