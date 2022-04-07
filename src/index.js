import React from "react";
import ReactDOM from "react-dom";
import client from "./apollo";
import cartReducer from "./reducers/cartReduces";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./components/App";

const store = createStore(
  cartReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
