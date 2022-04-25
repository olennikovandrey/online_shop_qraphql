import CategoryWrapper from "./Category/CategoryWrapper";
import Header from "./Header/Header";
import * as functions from "../services/functions";
import { getCatalog, getProductAvailable } from "../actions/cart";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state ={
      isLoaded: false,
      isBackgroundBlur: false,
      shopData: [],
    };
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
    const data = await functions.loadShopDataAsync();
    this.setState({
      shopData: data.categories,
      isLoaded: true
    });
    this.catalogLoader(data.categories);
    this.productsAvailableLoader(data.categories[0].products.filter(item => item.inStock));
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
    const { shopData, isLoaded, isBackgroundBlur } = this.state;

    return (
      <div>
        <Header
          setCategoryName={this.setCategoryName}
          setBlur={this.setBlur}
        />
        <CategoryWrapper
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
