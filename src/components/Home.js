import React, { Component } from "react";
import CategoryWrapper from "./Category/CategoryWrapper";
import Header from "./Header/Header";


export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <CategoryWrapper categoryName="Women"/>
      </div>
    )
  }
}
