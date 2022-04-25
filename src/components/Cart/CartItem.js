import CartAttributes from "./CartAttributes";
import { store } from "../../index";
import { addQuantity, removeQuantity, removeItem } from "../../actions/cart";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";


import "./styles/cart.css";
import "./styles/swiper.css";

SwiperCore.use([Navigation]);

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.addedItems.find(item => this.props.finder === item.id + item.firstAttr + item.secondAttr + item.thirdAttr).quantity
    };
    store.subscribe(() => {
      this.setState({
        quantity: this.props.addedItems.find(item => this.props.finder === item.id + item.firstAttr + item.secondAttr + item.thirdAttr).quantity
      });
    });
  }

  addCurrentQuantity = (payload) => {
    this.props.addQuantity(payload);
  };

  removeCurrentQuantity = (payload) => {
    this.props.removeQuantity(payload);
  };

  removeItemFromCart = (payload) => {
    this.props.removeItem(payload);
  };

  render() {
    const { id, currency, addedItems, finder } = this.props,
      currentItem = addedItems.find(item => finder === item.id + item.firstAttr + item.secondAttr + item.thirdAttr);

    return (
      <>
        <section className="cart-item-wrapper">
          <div className="cart-item-description-wrapper">
            <div>
              <span className="cart-item-brand">{ currentItem.brand }</span>
              <span className="cart-item-name">{ currentItem.name }</span>
            </div>
            <span className="cart-item-price">
              { currency } { currentItem.prices.filter(item =>
                item.currency.symbol === currency)[0].amount
              }
            </span>
            <div className="sizes-wrapper">
              { currentItem.firstAttr.length > 0 &&
                <CartAttributes
                  currentItem={currentItem}
                  attr={currentItem.firstAttr}
                  currentAttributes={ currentItem.attributes[0] }
                />
              }
              { currentItem.secondAttr.length > 0 &&
                <CartAttributes
                  currentItem={currentItem}
                  attr={currentItem.secondAttr}
                  currentAttributes={ currentItem.attributes[1] }
                />
              }
              { currentItem.thirdAttr.length > 0 &&
                <CartAttributes
                  currentItem={currentItem}
                  attr={currentItem.thirdAttr}
                  currentAttributes={ currentItem.attributes[2] }
                />
              }
            </div>
          </div>
          <div className="cart-item-btns-img-wrapper">
            <div className="btns-wrapper">
              <div className="cart-counter-btn" onClick={ () => this.addCurrentQuantity(currentItem) }>+</div>
              <span>{ this.state.quantity }</span>
              <div className="cart-counter-btn" onClick={ () => this.removeCurrentQuantity(currentItem) }>-</div>
            </div>
            <div className="cart-img-wrapper">
              { currentItem.gallery.length > 1 ?
                <Swiper
                  navigation={ true }
                  effect={ "cube" }
                  loop={ true }
                  mousewheel={ true }
                  slidesPerView={ "auto" }
                  spaceBetween={ 150 }
                  centeredSlides={ true }
                >
                  {currentItem.gallery.map((item) =>
                    <SwiperSlide key={ item }>
                      <Link to={ `id=${ id }` }>
                        <img className="cart-item-img" src={ item } alt={ currentItem.name }></img>
                      </Link>
                    </SwiperSlide>
                  )}
                </Swiper> :
                <Link to={ `id=${ id }` }>
                  <img className="cart-item-img" src={currentItem.gallery[0]} alt={currentItem.name}></img>
                </Link>
              }
              <span className="cart-remove-item-btn"
                onClick={ () => this.removeItemFromCart(currentItem) }>
              </span>
            </div>
          </div>
        </section>
      </>
    );
  }
}

CartItem.propTypes = {
  id: PropTypes.string,
  currency: PropTypes.string,
  finder: PropTypes.string,
  addedItems: PropTypes.array,
  addQuantity: PropTypes.func,
  removeQuantity: PropTypes.func,
  removeItem: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    addedItems: state.addedItems,
    currency: state.currency
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuantity: (payload) => {
      dispatch(addQuantity(payload));
    },
    removeQuantity: (payload) => {
      dispatch(removeQuantity(payload));
    },
    removeItem: (payload) => {
      dispatch(removeItem(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
