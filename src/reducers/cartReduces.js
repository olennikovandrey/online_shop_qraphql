import {
  GET_CATALOG,
  GET_SYMBOLS,
  GET_PRODUCT_AVAILABLE,
  ADD_TO_CART,
  REMOVE_ITEM,
  ADD_QUANTITY,
  REMOVE_QUANTITY,
  CHANGE_CURRENCY,
  ADD_FIRST_ATTRIBUTE
} from "../actions/action-types/cart-actions";

const initState = {
  catalog: [],
  symbols: [],
  addedItems: JSON.parse(localStorage.getItem("Cart")) || [],
  availableProducts: [],
  currency: JSON.parse(localStorage.getItem("Currency")) || "$",
  totalPrice: JSON.parse(localStorage.getItem("TotalPrice")) || 0
};

let firstAttr = [];
const cartReducer = (state = initState, action) => {

  switch (action.type) {
    case GET_SYMBOLS: {
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
      const addedItem = state.catalog[0].products.find(item => item.id === action.id);
      const copyAddedItem = Object.assign({}, addedItem);
      let existedItem = state.addedItems.find(item => action.id === item.id);
      if (existedItem) {
        copyAddedItem.quantity += 1;
        copyAddedItem.firstAttr = firstAttr;
        firstAttr = [];
        debugger
        return {
          ...state,
          totalPrice: state.totalPrice,
        };
       } else {
        copyAddedItem.quantity = 1;
        copyAddedItem.firstAttr = firstAttr;
        let newTotal = state.totalPrice + addedItem.prices.filter(item => item.currency.symbol === state.currency)[0].amount;

        localStorage.setItem("Cart", JSON.stringify([...state.addedItems, copyAddedItem]));
        localStorage.setItem("TotalPrice", JSON.stringify(parseFloat(newTotal.toFixed(2))));

        return {
          ...state,
          addedItems: [...state.addedItems, copyAddedItem],
          totalPrice: parseFloat(newTotal.toFixed(2))
        };
      }
    }

    case REMOVE_ITEM: {
      let itemToRemove = state.addedItems.find(item => action.id === item.id);
      let newItems = state.addedItems.filter(item => action.id !== item.id);
      let newTotal = state.totalPrice - (itemToRemove.prices.filter(item => item.currency.symbol === state.currency)[0].amount * itemToRemove.quantity);
      itemToRemove.quantity = 0;
      firstAttr = [];

      localStorage.setItem("Cart", JSON.stringify(state.addedItems.filter(item => item.id !== action.id)));
      localStorage.setItem("TotalPrice", JSON.stringify(parseFloat(newTotal.toFixed(2))));

      return {
        ...state,
        addedItems: newItems,
        totalPrice: parseFloat(newTotal.toFixed(2))
      };
    }

    case ADD_QUANTITY: {
      let currentItem = state.addedItems.find(item => item.id === action.id);
      currentItem.quantity += 1;
      let priceToAdd = currentItem.prices.filter(item => item.currency.symbol === state.currency)[0].amount;

      localStorage.setItem("TotalPrice", JSON.stringify(parseFloat((state.totalPrice + priceToAdd).toFixed(2))));

      return {
        ...state,
        totalPrice: parseFloat((state.totalPrice + priceToAdd).toFixed(2))
      };
    }

    case REMOVE_QUANTITY: {
      let currentItem = state.addedItems.find(item => item.id === action.id);
      let priceToRemove = currentItem.prices.filter(item => item.currency.symbol === state.currency)[0].amount;

      if (currentItem.quantity === 1) {
        let newItems = state.addedItems.filter(item => item.id !== action.id);
        let newTotal = state.totalPrice - priceToRemove;
        currentItem.quantity = 0;

        localStorage.setItem("TotalPrice", JSON.stringify(parseFloat(newTotal.toFixed(2))));

        return {
          ...state,
          addedItems: newItems,
          totalPrice: parseFloat(newTotal.toFixed(2))
        };
      } else {
        currentItem.quantity -= 1;
        let newTotal = parseFloat((state.totalPrice - priceToRemove).toFixed(2));

        localStorage.setItem("TotalPrice", JSON.stringify(parseFloat(newTotal.toFixed(2))));

        return {
          ...state,
          totalPrice: parseFloat(newTotal.toFixed(2))
        };
      }
    }

    case CHANGE_CURRENCY: {
      const addedItemsPrices = [];
      (function () {
        state.addedItems.forEach(
          el => addedItemsPrices.push(
            el.prices.filter(
              item => (item.currency.symbol === action.value)
            )[0].amount * el.quantity
          )
        )
      }());
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
      if (firstAttr.find(item => item === action.id) === undefined) {
        firstAttr.push( action.id);
      }




      console.log(firstAttr);
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

console.log("2",firstAttr);
export default cartReducer;
