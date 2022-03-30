import React, { Component } from "react";
import CategoryWrapper from "./Category/CategoryWrapper";
import Header from "./Header/Header";

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state ={
      categoryName: "ALL"
    };
    this.setCategoryName = this.setCategoryName.bind(this)
  }

  setCategoryName(value) {
    this.setState({
      categoryName: value
    })
  }

  render() {
    return (
      <div>
        <Header setCategoryName={this.setCategoryName}/>
        <CategoryWrapper categoryName={this.state.categoryName}/>
      </div>
    )
  }
}
