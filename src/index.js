import App from "./components/App";
import client from "./apollo";
import cartReducer from "./reducers/cartReduces";
import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { createStore } from "redux";


export const store = createStore(
  cartReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
