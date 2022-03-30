import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";
import "./category.css";
import client from "../../apollo";
import { GET_SHOP } from "../../services/queries";

async function loadShopDataAsync() {
  const { data } = await client.query({query: GET_SHOP} );
  return data
}

export default class CategoryWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isOverflow: true,
      showMoreBtn: true,
      shopData: []
    };
    this.showMoreFn = this.showMoreFn.bind(this)
    this.loadShopData = this.loadShopData.bind(this)
  }

  async loadShopData() {
    const data = await loadShopDataAsync();
    this.setState({
      shopData: data.categories
    })
  }

  componentDidMount() {
    this.loadShopData();
    this.setState({
      isLoaded: true
    })
  }

  showMoreFn(){
    this.setState({
      showMoreBtn: !this.state.showMoreBtn,
      isOverflow: !this.state.isOverflow
    })
  }

  render() {
    const { error, isLoaded, shopData } = this.state;
    const filteredShopData = shopData.filter(item => item.name === this.props.categoryName.toLowerCase())
    console.log("shopData:",shopData)
    console.log("filteredShopData:", filteredShopData)

    if (error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else if (!isLoaded) {
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
          {filteredShopData
            .map(item =>
              <React.Fragment key={item.id}>
                <Link to={`/${item.id}`}>
                  <ProductCard
                    image={item.gallery}
                    name={item.name}
                    currencyPrice={item.prices[0].amount}
                    symbol={item.prices[0].currency.symbol}
                    id={item.id}
                  />
                </Link>
              </React.Fragment>
            )}
          </div>
          {filteredShopData.length > 6 && <button className="show-more-btn" onClick={this.showMoreFn}>{this.state.showMoreBtn ? "SHOW MORE" : "HIDE"}</button>}
        </section>
      )
    }
  }
}
