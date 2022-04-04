import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import Home from "./Home";
import "../assets/styles/general.css";
import "../assets/styles/fonts.css";
import ProductPage from "./ProductPage/ProductPage";
import PageNotFount from "./PageNotFound/PageNotFount";

export default class App extends Component {
  render() {
    return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/id=:id" component={WithParamsProductPage} />
        <Route path="/404" component={PageNotFount} />
        <Route path="*"
          render={() => {return <Redirect to="/404" />}}
        />
      </Switch>
    </Router>
    )
  }
}

const WithParamsProductPage = withRouter(ProductPage)
