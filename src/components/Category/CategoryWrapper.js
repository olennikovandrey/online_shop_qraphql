import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";
import { styles } from "../../assets/styles/styles";
import * as functions from "../../services/functions";
import { getCatalog, getProductAvailable } from "../../actions/cart";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";

class CategoryWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isOverflow: true,
      isShowMoreBtn: true,
      shopData: []
    };
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

  async loadShopData(categoryName) {
    const data = await functions.loadCategoryDataAsync(categoryName);
    this.setState({
      shopData: data.category.products,
      isLoaded: true
    });
    this.catalogLoader(data.category.products);
    this.productsAvailableLoader(data.category.products.filter(item => item.inStock));
  }

  async componentDidUpdate(prevProps) {
    if(prevProps.categoryName !== this.props.categoryName) {
      await this.loadShopData(this.props.categoryName.toLowerCase());
    }
  }

  async componentDidMount() {
    await this.loadShopData(this.props.categoryName.toLowerCase());
  }

  render() {
    const { isOverflow, isShowMoreBtn, isLoaded, shopData } = this.state,
      { currency, isBackgroundBlur, categoryName } = this.props;

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
          <div className={ isOverflow ? "category-part-items-wrapper" : "category-all-items-wrapper" }>
            { shopData
              .map(item =>
                <React.Fragment key={ item.id + item.firstAttr + item.secondAttr + item.thirdAttr }>
                  <ProductCard
                    image={ item.gallery[0] }
                    brand={item.brand}
                    name={ item.name }
                    amount={ item.prices.filter(el => el.currency.symbol === "$")[0].amount }
                    currency={ currency }
                    id={ item.id }
                    shopData={ shopData }
                  />
                </React.Fragment>
              )}
          </div>
          { shopData.length > 6 &&
            <button className="show-more-btn" onClick={this.showMoreFn}>{ isShowMoreBtn ? "SHOW MORE" : "HIDE" }</button>
          }
        </section>
      );
    }
  }
}

CategoryWrapper.propTypes = {
  isBackgroundBlur: PropTypes.bool,
  categoryName: PropTypes.string,
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
    getCatalog: (payload) => { dispatch(getCatalog(payload)); },
    getProductAvailable: (payload) => { dispatch(getProductAvailable(payload)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryWrapper);
