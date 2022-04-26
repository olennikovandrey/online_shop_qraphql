import {
  GET_CATALOG,
  GET_CURRENCY,
  GET_PRODUCT_AVAILABLE,
  ADD_TO_CART,
  REMOVE_ITEM,
  ADD_QUANTITY,
  REMOVE_QUANTITY,
  CHANGE_CURRENCY,
  SET_CATEGORY
} from "../actions/action-types/cart-actions";

export const initState = {
  catalog: [],
  symbols: [],
  addedItems: JSON.parse(localStorage.getItem("Cart")) || [],
  availableProducts: [],
  currency: JSON.parse(localStorage.getItem("Currency")) || "$",
  totalPrice: JSON.parse(localStorage.getItem("TotalPrice")) || 0,
  totalItemsInCart: JSON.parse(localStorage.getItem("totalItemsInCart")) || 0,
  categoryName: "ALL"
};

const cartReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
  case GET_CURRENCY: {
    const downloadedData = action.payload;
    return {
      ...state,
      symbols: downloadedData
    };
  }

  case GET_CATALOG: {
    const downloadedData = action.payload;
    return {
      ...state,
      catalog: downloadedData
    };
  }

  case GET_PRODUCT_AVAILABLE: {
    const downloadedData = action.payload;
    return {
      ...state,
      availableProducts: downloadedData
    };
  }

  case ADD_TO_CART: {
    const addedItem = Object.assign({}, action.payload);
    const existedItem = state.addedItems.find(item => item.workID  === action.payload.id + action.payload.firstAttr + action.payload.secondAttr + action.payload.thirdAttr);

    if (existedItem) {
      const newTotal = state.totalPrice + addedItem.prices.filter(item => item.currency.symbol === state.currency)[0].amount;
      existedItem.quantity += 1;

      localStorage.setItem("TotalPrice", JSON.stringify(parseFloat(newTotal.toFixed(2))));
      localStorage.setItem("totalItemsInCart", state.totalItemsInCart + 1);

      return {
        ...state,
        totalPrice: parseFloat(newTotal.toFixed(2)),
        totalItemsInCart: state.totalItemsInCart + 1
      };
    } else {
      addedItem.quantity = 1;
      addedItem.workID = addedItem.id + addedItem.firstAttr + addedItem.secondAttr + addedItem.thirdAttr;
      const newTotal = state.totalPrice + addedItem.prices.filter(item => item.currency.symbol === state.currency)[0].amount;

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
    const itemToRemove = state.addedItems.find(item => JSON.stringify(action.payload) === JSON.stringify(item));
    const newItems = state.addedItems.filter(item => action.payload !== item);
    const newTotal = state.totalPrice - (itemToRemove.prices.filter(item => item.currency.symbol === state.currency)[0].amount * itemToRemove.quantity);
    const newTotalItemsInCart = state.totalItemsInCart - itemToRemove.quantity;

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
    const currentItem = action.payload;
    currentItem.quantity += 1;
    const priceToAdd = currentItem.prices.filter(item => item.currency.symbol === state.currency)[0].amount;

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
    const currentItem = state.addedItems.find(item => JSON.stringify(item) === JSON.stringify(action.payload));
    const priceToRemove = currentItem.prices.filter(item => item.currency.symbol === state.currency)[0].amount;

    if (currentItem.quantity === 1) {
      const newItems = state.addedItems.filter(item => JSON.stringify(item) !== JSON.stringify(action.payload));
      const newTotal = state.totalPrice - priceToRemove;
      const newTotalItemsInCart = state.totalItemsInCart - 1;
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
      const newTotalItemsInCart = state.totalItemsInCart - 1;
      const newTotal = parseFloat((state.totalPrice - priceToRemove).toFixed(2));

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
    addedItemsPrices.push(state.addedItems.forEach(
      el => addedItemsPrices.push(
        el.prices.filter(
          item => (item.currency.symbol === action.value)
        )[0].amount * el.quantity
      )
    ));
    addedItemsPrices.pop();

    const newTotal = addedItemsPrices.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    const newCurrency = action.value;
    localStorage.setItem("Currency", JSON.stringify(action.value));
    localStorage.setItem("TotalPrice", JSON.stringify(parseFloat(newTotal.toFixed(2))));

    return {
      ...state,
      totalPrice: parseFloat(newTotal.toFixed(2)),
      currency: newCurrency
    };
  }

  case SET_CATEGORY: {
    return {
      ...state,
      categoryName: action.value
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
