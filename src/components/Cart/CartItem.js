import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { addQuantity, removeQuantity, removeItem } from "../../actions/cart";
import "./styles/cart.css";

SwiperCore.use([Navigation]);

class CartItem extends Component {
  constructor(props) {
    super(props);
  }

  addCurrentQuantity = (id) => {
    this.props.addQuantity(id);
  };

  removeCurrentQuantity = (id) => {
    this.props.removeQuantity(id);
  }

  removeItemFromCart = (id) => {
    this.props.removeItem(id);
  };

  render() {
    const { addedItems, id, currency } = this.props,
          currentItem = addedItems.find(item => id === item.id);

    return (
      <>
        <section className="cart-item-wrapper">
          <div className="cart-item-description-wrapper">
            <div>
              <span className="cart-item-brand">{ currentItem.brand }</span>
              <span className="cart-item-name">{ currentItem.name }</span>
            </div>
            <span className="cart-item-price">{ currency } { currentItem.prices.filter(current => current.currency.symbol === currency)[0].amount }</span>
            <div className="cart-item-color-size">S</div>
          </div>
          <div className="cart-item-btns-img-wrapper">
            <div className="btns-wrapper">
              <div className="cart-counter-btn" onClick={ () => this.addCurrentQuantity(id) }>+</div>
              <span>{currentItem.quantity}</span>
              <div className="cart-counter-btn" onClick={ () => this.removeCurrentQuantity(id) }>-</div>
            </div>
            { currentItem.gallery.length > 1 ?
              <Swiper
                navigation={true}
                effect={"cube"}
                slidesPerView={1}
                loop={true}
                mousewheel={true}
              >
                {currentItem.gallery.map((item) =>
                  <SwiperSlide key={item.index}>
                    <Link to={ `id=${ id }` }>
                      <img className="cart-item-img" src={item} alt={currentItem.name}></img>
                    </Link>
                  </SwiperSlide>
                )}
              </Swiper> :
              <Link to={ `id=${ id }` }>
                <img className="cart-item-img" src={currentItem.gallery[0]} alt={currentItem.name}></img>
              </Link>
            }
            <span className="remove-item-btn"
              onClick={ () => this.removeItemFromCart(id) }>
            </span>
          </div>
        </section>
      </>
    );
  }
}

CartItem.propTypes = {
  addedItems: PropTypes.array,
  id: PropTypes.string,
  currency: PropTypes.string,
  addQuantity: PropTypes.func,
  removeQuantity: PropTypes.func,
  removeItem: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    addedItems: state.addedItems,
    currency: state.currency
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuantity: (id) => {
      dispatch(addQuantity(id));
    },
    removeQuantity: (id) => {
      dispatch(removeQuantity(id));
    },
    removeItem: (id) => {
      dispatch(removeItem(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
