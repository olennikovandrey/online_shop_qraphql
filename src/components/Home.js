import React, { Component } from "react";
import PropTypes from "prop-types";
import client from "../apollo";
import { connect } from "react-redux";
import CategoryWrapper from "./Category/CategoryWrapper";
import Header from "./Header/Header";
import { getCatalog, getProductAvailable } from "../actions/cart";
import { GET_SHOP } from "../services/queries";

async function loadShopDataAsync() {
  const { data } = await client.query({query: GET_SHOP} );
  return data;
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state ={
      isLoaded: false,
      isBackgroundBlur: false,
      categoryName: "ALL",
      shopData: [],
    };
    this.setCategoryName = this.setCategoryName.bind(this);
    this.loadShopData = this.loadShopData.bind(this);
    this.setBlur = this.setBlur.bind(this);
  }

  catalogLoader = (data) => {
    this.props.getCatalog(data);
  };

  productsAvailableLoader = (data) => {
    this.props.getProductAvailable(data);
  };

  async loadShopData() {
    const data = await loadShopDataAsync();
    this.setState({
      shopData: data.categories,
      isLoaded: true
    });
    this.catalogLoader(data.categories);
    this.productsAvailableLoader(data.categories[0].products.filter(item => item.inStock));
    localStorage.setItem("shopData", JSON.stringify(data.categories));
    localStorage.setItem("availableProducts", JSON.stringify(data.categories[0].products.filter(item => item.inStock)));
  }

  setCategoryName(value) {
    this.setState({
      categoryName: value
    });
  }

  setBlur() {
    this.setState({
      isBackgroundBlur: !this.state.isBackgroundBlur
    });
  }

  async componentDidMount() {
    await this.loadShopData();
  }

  render() {
    const { categoryName, shopData, isLoaded, isBackgroundBlur } = this.state;

    return (
      <div>
        <Header
          setCategoryName={this.setCategoryName}
          setBlur={this.setBlur}
        />
        <CategoryWrapper
          categoryName={categoryName}
          shopData={shopData}
          isLoaded={isLoaded}
          isBackgroundBlur={isBackgroundBlur}
        />
      </div>
    );
  }
}

Home.propTypes = {
  symbols: PropTypes.array,
  getCatalog: PropTypes.func,
  getSymbols: PropTypes.func,
  getProductAvailable: PropTypes.func
};


const mapStateToProps = state => {
  console.log( {state});
  return {
    symbols: state.symbols
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCatalog: (payload) => {
      dispatch(getCatalog(payload));
    },
    getProductAvailable: (payload) => {
      dispatch(getProductAvailable(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
