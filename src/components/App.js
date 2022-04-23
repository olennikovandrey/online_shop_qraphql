import Cart from "./Cart/Cart";
import Home from "./Home";
import ProductPage from "./ProductPage/ProductPage";
import PageNotFount from "./PageNotFound/PageNotFount";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import React, { Component } from "react";
import "../assets/styles/general.css";
import "../assets/styles/fonts.css";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/id=:id" component={WithParamsProductPage} />
          <Route path="/cart" component={Cart} />
          <Route path="/404" component={PageNotFount} />
          <Route path="*"
            render={() => {return <Redirect to="/404" />;}}
          />
        </Switch>
      </Router>
    );
  }
}

const WithParamsProductPage = withRouter(ProductPage);
