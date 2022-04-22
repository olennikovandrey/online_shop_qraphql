import {
  GET_CATALOG,
  GET_CURRENCY,
  GET_PRODUCT_AVAILABLE,
  ADD_TO_CART,
  REMOVE_ITEM,
  ADD_QUANTITY,
  REMOVE_QUANTITY,
  CHANGE_CURRENCY,
  ADD_FIRST_ATTRIBUTE,
  ADD_SECOND_ATTRIBUTE,
  ADD_THIRD_ATTRIBUTE
} from "../actions/action-types/cart-actions";

export const initState = {
  catalog: JSON.parse(localStorage.getItem("shopData")) || [],
  symbols: [],
  addedItems: JSON.parse(localStorage.getItem("Cart")) || [],
  availableProducts: JSON.parse(localStorage.getItem("availableProducts")) || [],
  currency: JSON.parse(localStorage.getItem("Currency")) || "$",
  totalPrice: JSON.parse(localStorage.getItem("TotalPrice")) || 0,
  totalItemsInCart: JSON.parse(localStorage.getItem("totalItemsInCart")) || 0
};

let firstAttr = [];
let secondAttr = [];
let thirdAttr = [];
const cartReducer = (state = initState, action) => {

  switch (action.type) {
    case GET_CURRENCY: {
      let downloadedData = action.payload;
      return {
        ...state,
        symbols: downloadedData
      };
    }

    case GET_CATALOG: {
      let downloadedData = action.payload;
      return {
        ...state,
        catalog: downloadedData
      };
    }

    case GET_PRODUCT_AVAILABLE: {
      let downloadedData = action.payload;
      return {
        ...state,
        availableProducts: downloadedData
      };
    }

    case ADD_TO_CART: {
      const addedItem = Object.assign({}, action.payload);
      let existedItem = state.addedItems.find(item => item.workID  === action.payload.id + firstAttr + secondAttr + thirdAttr);

      if (existedItem) {
        let newTotal = state.totalPrice + addedItem.prices.filter(item => item.currency.symbol === state.currency)[0].amount;
        existedItem.quantity += 1;
        addedItem.firstAttr = firstAttr;
        addedItem.secondAttr = secondAttr;
        addedItem.thirdAttr = thirdAttr;
        firstAttr = [];
        secondAttr = [];
        thirdAttr = [];

        localStorage.setItem("TotalPrice", JSON.stringify(parseFloat(newTotal.toFixed(2))));
        localStorage.setItem("totalItemsInCart", state.totalItemsInCart + 1);

        return {
          ...state,
          totalPrice: parseFloat(newTotal.toFixed(2)),
          totalItemsInCart: state.totalItemsInCart + 1
        };
      } else {
        console.log(2);
        addedItem.quantity = 1;
        addedItem.firstAttr = firstAttr;
        addedItem.secondAttr = secondAttr;
        addedItem.thirdAttr = thirdAttr;
        addedItem.workID = addedItem.id + addedItem.firstAttr + addedItem.secondAttr + addedItem.thirdAttr;
        firstAttr = [];
        secondAttr = [];
        thirdAttr = [];
        let newTotal = state.totalPrice + addedItem.prices.filter(item => item.currency.symbol === state.currency)[0].amount;

        localStorage.setItem("Cart", JSON.stringify([...state.addedItems, addedItem]));
        localStorage.setItem("TotalPrice", JSON.stringify(parseFloat(newTotal.toFixed(2))));
        localStorage.setItem("totalItemsInCart", state.totalItemsInCart + 1);

        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          totalPrice: parseFloat(newTotal.toFixed(2)),
          totalItemsInCart: state.totalItemsInCart + 1
        };
      }
    }

    case REMOVE_ITEM: {
      let itemToRemove = state.addedItems.find(item => JSON.stringify(action.payload) === JSON.stringify(item));
      let newItems = state.addedItems.filter(item => action.payload !== item);
      let newTotal = state.totalPrice - (itemToRemove.prices.filter(item => item.currency.symbol === state.currency)[0].amount * itemToRemove.quantity);
      let newTotalItemsInCart = state.totalItemsInCart - itemToRemove.quantity;

      localStorage.setItem("Cart", JSON.stringify(newItems));
      localStorage.setItem("TotalPrice", JSON.stringify(parseFloat(newTotal.toFixed(2))));
      localStorage.setItem("totalItemsInCart", state.totalItemsInCart - itemToRemove.quantity);

      return {
        ...state,
        addedItems: newItems,
        totalPrice: parseFloat(newTotal.toFixed(2)),
        totalItemsInCart: newTotalItemsInCart
      };
    }

    case ADD_QUANTITY: {
      let currentItem = action.payload;
      currentItem.quantity += 1;
      let priceToAdd = currentItem.prices.filter(item => item.currency.symbol === state.currency)[0].amount;

      localStorage.setItem("Cart", JSON.stringify(state.addedItems));
      localStorage.setItem("TotalPrice", JSON.stringify(parseFloat((state.totalPrice + priceToAdd).toFixed(2))));
      localStorage.setItem("totalItemsInCart", state.totalItemsInCart + 1);

      return {
        ...state,
        totalPrice: parseFloat((state.totalPrice + priceToAdd).toFixed(2)),
        totalItemsInCart: state.totalItemsInCart + 1
      };
    }

    case REMOVE_QUANTITY: {
      let currentItem = state.addedItems.find(item => JSON.stringify(item) === JSON.stringify(action.payload));
      let priceToRemove = currentItem.prices.filter(item => item.currency.symbol === state.currency)[0].amount;

      if (currentItem.quantity === 1) {
        let newItems = state.addedItems.filter(item => JSON.stringify(item) !== JSON.stringify(action.payload));
        let newTotal = state.totalPrice - priceToRemove;
        let newTotalItemsInCart = state.totalItemsInCart - 1;
        currentItem.quantity = 0;

        localStorage.setItem("TotalPrice", JSON.stringify(parseFloat(newTotal.toFixed(2))));
        localStorage.setItem("totalItemsInCart", state.totalItemsInCart - 1);

        return {
          ...state,
          addedItems: newItems,
          totalPrice: parseFloat(newTotal.toFixed(2)),
          totalItemsInCart: newTotalItemsInCart
        };
      } else {
        currentItem.quantity -= 1;
        let newTotalItemsInCart = state.totalItemsInCart - 1;
        let newTotal = parseFloat((state.totalPrice - priceToRemove).toFixed(2));

        localStorage.setItem("TotalPrice", JSON.stringify(parseFloat(newTotal.toFixed(2))));
        localStorage.setItem("totalItemsInCart", state.totalItemsInCart - currentItem.quantity);
        localStorage.setItem("totalItemsInCart", state.totalItemsInCart - 1);

        return {
          ...state,
          totalPrice: parseFloat(newTotal.toFixed(2)),
          totalItemsInCart: newTotalItemsInCart
        };
      }
    }

    case CHANGE_CURRENCY: {
      const addedItemsPrices = [];
      function currencyChanger() {
        state.addedItems.forEach(
          el => addedItemsPrices.push(
            el.prices.filter(
              item => (item.currency.symbol === action.value)
            )[0].amount * el.quantity
          )
        );
      }
      currencyChanger();
      const newTotal = addedItemsPrices.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
        0
      );

      localStorage.setItem("Currency", JSON.stringify(action.value));
      localStorage.setItem("TotalPrice", JSON.stringify(parseFloat(newTotal.toFixed(2))));

      return {
        ...state,
        totalPrice: parseFloat(newTotal.toFixed(2)),
        currency: action.value
      };
    }

    case ADD_FIRST_ATTRIBUTE: {
      firstAttr.pop();
      firstAttr.push( action.id);
      console.log(firstAttr);
      return {
        ...state
      };
    }

    case ADD_SECOND_ATTRIBUTE: {
      secondAttr = [];
      secondAttr.push( action.value);
      console.log(secondAttr);
      return {
        ...state
      };
    }

    case ADD_THIRD_ATTRIBUTE: {
      thirdAttr = [];
      thirdAttr.push( action.value);
      console.log(thirdAttr);
      return {
        ...state
      };
    }

    default: {
      return {
        ...state
      };
    }
  }
};

export default cartReducer;
