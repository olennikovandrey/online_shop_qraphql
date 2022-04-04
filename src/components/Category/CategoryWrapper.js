import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";
import { styles } from "../../assets/styles/styles";
import "./category.css";

export default class CategoryWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isOverflow: true,
      isShowMoreBtn: true
    };
    this.showMoreFn = this.showMoreFn.bind(this)
  }

  showMoreFn(){
    this.setState({
      isShowMoreBtn: !this.state.isShowMoreBtn,
      isOverflow: !this.state.isOverflow
    })
  }

  render() {
    const { error, isOverflow, isShowMoreBtn } = this.state,
          { isLoaded, categoryName, shopData, currency, setCurrency, isBachgroundBlur } = this.props;

    if (error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else if (!isLoaded) {
      return (
        <section style={isBachgroundBlur ? styles.CategoryWrapperBlur : styles.CategoryWrapper }>
          <span className="category-name">{categoryName}</span>
          <div className="category-items-wrapper">
            <Loader />
          </div>
        </section>
      )
    } else {
      return (
        <section style={isBachgroundBlur ? styles.CategoryWrapperBlur : styles.CategoryWrapper }>
          <span className="category-name">{categoryName}</span>
          <div className={`${isOverflow ? "category-part-items-wrapper" : "category-all-items-wrapper"}`}>
          {shopData
            .filter(item => item.name === categoryName.toLowerCase())[0].products
            .map(item =>
              <React.Fragment key={item.id}>
                <Link to={`id=${item.id}`}>
                  <ProductCard
                    image={item.gallery[0]}
                    name={item.name}
                    amount={item.prices.filter(current => current.currency.symbol === currency)[0].amount}
                    currency={currency}
                    id={item.id}
                    setCurrency={setCurrency}
                  />
                </Link>
              </React.Fragment>
            )}
          </div>
          {shopData
            .filter(item => item.name === categoryName.toLowerCase())[0].products.length > 6 &&
            <button className="show-more-btn" onClick={this.showMoreFn}>{isShowMoreBtn ? "SHOW MORE" : "HIDE"}</button>}
        </section>
      )
    }
  }
}
