import { GET_CATALOG, GET_SYMBOLS, ADD_TO_CART, REMOVE_ITEM, ADD_QUANTITY, REMOVE_QUANTITY, CHANGE_CURRENCY } from "../actions/action-types/cart-actions";

const initState = {
  catalog: [],
  symbols: [],
  addedItems: [],
  currency: "$",
  totalPrice: 0
};

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

    case ADD_TO_CART: {
      let addedItem = state.catalog[0].products.find(item => item.id === action.id);
      let existedItem = state.addedItems.find(item => action.id === item.id);
      if (existedItem) {
        return {
          ...state,
          totalPrice: state.totalPrice
        };
       } else {
         let newTotal = parseFloat((state.totalPrice + addedItem.prices.filter(item => item.currency.symbol === state.currency)[0].amount).toFixed(2));
         return {
           ...state,
           addedItems: [...state.addedItems, addedItem],
           totalPrice: newTotal
         };
       }
    }

    case REMOVE_ITEM: {
      let itemToRemove = state.addedItems.find(item => action.id === item.id);
      let newItems = state.addedItems.filter(item => action.id !== item.id);
      let newTotal = parseFloat((state.totalPrice - itemToRemove.prices.filter(item => item.currency.symbol === state.currency)[0].amount).toFixed(2));
      return {
        ...state,
        addedItems: newItems,
        totalPrice: newTotal
      };
    }

    case ADD_QUANTITY: {
      let addedItem = state.items.find(item => item.id === action.id); //
      addedItem.quantity += 1;
      let newTotal = state.total + addedItem.price; //
      return {
        ...state,
        total: newTotal
      };
    }

    case REMOVE_QUANTITY: {
      let addedItem = state.items.find(item => item.id === action.id); //
      if (addedItem.quantity === 1) {
        let newItems = state.addedItems.filter(item => item.id !== action.id);
        let newTotal = state.total - addedItem.price; //
        return {
          ...state,
          addedItems: newItems,
          total: newTotal
        };
      } else {
        addedItem.quantity -+ 1;
        let newTotal = state.total - addedItem.price; //
        return {
          ...state,
          total: newTotal
        };
      }
    }

    case CHANGE_CURRENCY: {
      console.log(action.value);
      let currency = action.value;
      return {
        ...state,
        currency: currency
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
