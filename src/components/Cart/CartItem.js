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
    this.state = {
      currentItem: this.props.addedItems.find(item => this.props.id === item.id)
    };
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
    const { id, currency } = this.props,
          { currentItem } = this.state;

    return (
      <>
        <section className="cart-item-wrapper">
          <div className="cart-item-description-wrapper">
            <div>
              <span className="cart-item-brand">{ currentItem.brand }</span>
              <span className="cart-item-name">{ currentItem.name }</span>
            </div>
            <span className="cart-item-price">{ currency } { currentItem.prices.filter(current => current.currency.symbol === currency)[0].amount }</span>
            <div className="sizes-wrapper">
              { currentItem.firstAttr.length > 0 ? <div className="cart-item-color-size">{ currentItem.firstAttr[0].substring(0, 3) }</div>  : null }
              { currentItem.secondAttr.length > 0 ? <div className="cart-item-color-size" style={ { backgroundColor: currentItem.secondAttr[0] } }></div> : null }
              { currentItem.thirdAttr.length > 0  ? <div className="cart-item-color-size">{ currentItem.thirdAttr[0].substring(0, 3) }</div> : null }
          </div>
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
