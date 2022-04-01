import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";
import "./category.css";

export default class CategoryWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isOverflow: true,
      showMoreBtn: true
    };
    this.showMoreFn = this.showMoreFn.bind(this)
  }

  showMoreFn(){
    this.setState({
      showMoreBtn: !this.state.showMoreBtn,
      isOverflow: !this.state.isOverflow
    })
  }

  render() {
    if (this.state.error) {
      return (
        <div>Error: {this.state.error.message}</div>
      )
    } else if (!this.props.isLoaded) {
      return (
        <section className="category-wrapper">
          <span className="category-name">{this.props.categoryName}</span>
          <div className="category-items-wrapper">
            <Loader />
          </div>
        </section>
      )
    } else {
      return (
        <section className="category-wrapper">
          <span className="category-name">{this.props.categoryName}</span>
          <div className={`${this.state.isOverflow ? "category-part-items-wrapper" : "category-all-items-wrapper"}`}>
          {this.props.shopData
            .filter(item => item.name === this.props.categoryName.toLowerCase())[0].products
            .map(item =>
              <React.Fragment key={item.id}>
                <Link to={`/${item.id}`}>
                  <ProductCard
                    image={item.gallery[0]}
                    name={item.name}
                    amount={(item.prices.some(cur => cur.currency.symbol === this.props.currency)) ? item.prices[0].amount : "fdfds"}
                    currency={this.props.currency}

                    id={item.id}
                  />
                </Link>
              </React.Fragment>

            )}
          </div>
          {this.props.shopData
            .filter(item => item.name === this.props.categoryName.toLowerCase())[0].products.length > 6 &&
            <button className="show-more-btn" onClick={this.showMoreFn}>{this.state.showMoreBtn ? "SHOW MORE" : "HIDE"}</button>}
        </section>
      )
    }
  }
}
