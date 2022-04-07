import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import "./styles/cart.css";

SwiperCore.use([Navigation]);

class CartItem extends Component {
  constructor(props) {
    super(props);
  }

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
              <div className="cart-counter-btn">+</div>
              <span>1</span>
              <div className="cart-counter-btn">-</div>
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
          </div>
        </section>
      </>
    );
  }
}

CartItem.propTypes = {
  addedItems: PropTypes.array,
  id: PropTypes.string,
  currency: PropTypes.string
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
