import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";
import { styles } from "../../assets/styles/styles";
import * as functions from "../../services/functions";
import { getCatalog, getProductAvailable } from "../../actions/cart";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import "./category.css";

class CategoryWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isOverflow: true,
      isShowMoreBtn: true,
      shopData: [],
    };
    this.loadShopData = this.loadShopData.bind(this);
    this.showMoreFn = this.showMoreFn.bind(this);
  }

  catalogLoader = (data) => {
    this.props.getCatalog(data);
  };

  productsAvailableLoader = (data) => {
    this.props.getProductAvailable(data);
  };

  showMoreFn(){
    this.setState({
      isShowMoreBtn: !this.state.isShowMoreBtn,
      isOverflow: !this.state.isOverflow
    });
  }

  async loadShopData() {
    const data = await functions.loadShopDataAsync();
    this.setState({
      shopData: data.categories,
      isLoaded: true
    });
    this.catalogLoader(data.categories);
    this.productsAvailableLoader(data.categories[0].products.filter(item => item.inStock));
  }

  async componentDidMount() {
    await this.loadShopData();
  }

  render() {
    const { isOverflow, isShowMoreBtn, isLoaded, shopData } = this.state,
      { categoryName, currency, isBackgroundBlur } = this.props;

    if (!isLoaded) {
      return (
        <section style={ isBackgroundBlur ? styles.CategoryWrapperBlur : styles.CategoryWrapper }>
          <span className="category-name">{ categoryName }</span>
          <div className="category-items-wrapper">
            <Loader />
          </div>
        </section>
      );
    } else {
      return (
        <section style={ isBackgroundBlur ? styles.CategoryWrapperBlur : styles.CategoryWrapper }>
          <span className="category-name">{ categoryName }</span>
          <div className={ `${ isOverflow ? "category-part-items-wrapper" : "category-all-items-wrapper" }` }>
            { shopData
              .filter(item => item.name === categoryName.toLowerCase())[0].products
              .map(item =>
                <React.Fragment key={ item.id + item.firstAttr + item.secondAttr + item.thirdAttr }>
                  <ProductCard
                    image={ item.gallery[0] }
                    brand={item.brand}
                    name={ item.name }
                    amount={ item.prices.filter(el => el.currency.symbol === currency)[0].amount }
                    currency={ currency }
                    id={ item.id }
                    shopData={ shopData }
                  />
                </React.Fragment>
              )}
          </div>
          { shopData
            .filter(item => item.name === categoryName.toLowerCase())[0].products.length > 6 &&
            <button className="show-more-btn" onClick={this.showMoreFn}>{isShowMoreBtn ? "SHOW MORE" : "HIDE"}</button>
          }
        </section>
      );
    }
  }
}

CategoryWrapper.propTypes = {
  isLoaded: PropTypes.bool,
  isBackgroundBlur: PropTypes.bool,
  categoryName: PropTypes.string,
  shopData: PropTypes.array,
  currency: PropTypes.string,
  getCatalog: PropTypes.func,
  getSymbols: PropTypes.func,
  getProductAvailable: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    categoryName: state.categoryName
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryWrapper);
