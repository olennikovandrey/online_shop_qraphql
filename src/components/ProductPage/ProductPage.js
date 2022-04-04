import React, { Component, Suspense } from "react";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import client from "../../apollo";
import { GET_PRODUCT } from "../../services/queries";
import { styles } from "../../assets/styles/styles";
import "./product-page.css";


export default class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      symbols: [],
      currency: "$",
      error: null,
      isLoaded: false,
      isBackgroundBlur: false
    };
    this.setCurrency = this.setCurrency.bind(this);
    this.setBlur = this.setBlur.bind(this);
  }

  setCurrency(value) {
    this.setState({
      currency: value
    })
  }

  async loadShopDataAsync() {
    const { data } = await client.query({
      query: GET_PRODUCT,
      variables: {"productId": this.props.match.params.id}
    });
    return data
  }

  async loadShopData() {
    const data = await this.loadShopDataAsync();
    this.setState({
      productData: data.product,
      symbols: data.product.prices
    });
  }

  setBlur() {
    this.setState({
      isBackgroundBlur: !this.state.isBackgroundBlur
    })
  }

  createMarkup(value) {
    return {__html: value};
  }

  componentDidMount() {
    this.loadShopData();
    this.setState({
      isLoaded: true
    });

  }

  render() {
    const { productData, symbols, currency, isLoaded, isBackgroundBlur } = this.state;
    console.log(productData);

    if (!isLoaded) {
      return (
        <div className="product-page-wrapper">
          <Loader />
        </div>
      )
    } else {
      return (
        <>
          <Header
            setCategoryName={null}
            symbols={symbols}
            setCurrency={this.setCurrency}
            setBlur={this.setBlur}
          />
          <section style={isBackgroundBlur ? styles.ProductPageWrapperBlur : styles.ProductPageWrapper}>
            <div className="preview-img-wrapper">
              <img className="preview-img" width="80" height="auto" alt={productData.name} />
              <img className="preview-img" src="https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg" width="80" height="auto" alt={productData.name} />
            </div>
            <div className="product-info">
              <div>
                  <img className="product-img" src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087" alt={productData.name} />
              </div>
              <div className="product-details">
                <p className="product-name">{productData.brand}</p>
                <p className="product-brief-description">{productData.name}</p>
                <p className="product-sizes-title">SIZE:</p>
                <div className="avail-sizes-wrapper">
                  <div className="avail-size">XS</div>
                  <div className="avail-size">S</div>
                  <div className="avail-size">M</div>
                  <div className="avail-size">L</div>
                </div>
                <p className="product-price-title">PRICE:</p>
                <p className="product-price">{currency} </p>
                <button>ADD TO CART</button>
                <div className="product-description" dangerouslySetInnerHTML={this.createMarkup(productData.description)} />
              </div>
            </div>
          </section>
        </>
      )
    }
  }
}
