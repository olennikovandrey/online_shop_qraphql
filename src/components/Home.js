import React, { Component } from "react";
import CategoryWrapper from "./Category/CategoryWrapper";
import Header from "./Header/Header";
import client from "../apollo";
import { GET_SHOP } from "../services/queries";

async function loadShopDataAsync() {
  const { data } = await client.query({query: GET_SHOP} );
  return data
}

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state ={
      categoryName: "ALL",
      isLoaded: false,
      shopData: [],
      symbols: [],
      currency: "$"
    };
    this.setCategoryName = this.setCategoryName.bind(this);
    this.loadShopData = this.loadShopData.bind(this);
    this.setCurrency = this.setCurrency.bind(this)
  }

  async loadShopData() {
    const data = await loadShopDataAsync();
    this.setState({
      shopData: data.categories,
      symbols: data.categories[0].products[0].prices,
      isLoaded: true
    })
  }

  setCategoryName(value) {
    this.setState({
      categoryName: value
    })
  }

  setCurrency(value) {
    this.setState({
      currency: value
    })
  }

  componentDidMount() {
    this.loadShopData();
  }

  render() {
    const { categoryName, shopData, isLoaded, symbols, currency } = this.state;

    return (
      <div>
        <Header
          setCategoryName={this.setCategoryName}
          symbols={symbols}
          setCurrency={this.setCurrency} />
        <CategoryWrapper
          categoryName={categoryName}
          shopData={shopData}
          isLoaded={isLoaded}
          currency={currency} />
      </div>
    )
  }
}
