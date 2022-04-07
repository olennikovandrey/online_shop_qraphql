import React, { Component } from "react";
import PropTypes from "prop-types";
import client from "../apollo";
import { connect } from "react-redux";
import CategoryWrapper from "./Category/CategoryWrapper";
import Header from "./Header/Header";
import { getCatalog, getSymbols } from "../actions/cart";
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

  symbolsLoader = (data) => {
    this.props.getSymbols(data);
  };

  async loadShopData() {
    const data = await loadShopDataAsync();
    this.setState({
      shopData: data.categories,
      isLoaded: true
    });
    this.catalogLoader(data.categories);
    this.symbolsLoader(data.categories[0].products[0].prices);
    console.log("state.catalog from Home", this.props.catalog);
    console.log("shopData from Home", this.state.shopData);
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

  componentDidMount() {
    this.loadShopData();
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
  catalog: PropTypes.array,
  symbols: PropTypes.array,
  getCatalog: PropTypes.func,
  getSymbols: PropTypes.func
};


const mapStateToProps = state => {
  console.log("state", state);
  return {
    catalog: state.catalog,
    symbols: state.symbols
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCatalog: (payload) => {
      dispatch(getCatalog(payload));
    },
    getSymbols: (payload) => {
      dispatch(getSymbols(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
