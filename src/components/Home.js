import Header from "./Header/Header";
import CategoryWrapper from "./Category/CategoryWrapper";
import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state ={
      isBackgroundBlur: false
    };
    this.setBlur = this.setBlur.bind(this);
  }

  setBlur() {
    this.setState({
      isBackgroundBlur: !this.state.isBackgroundBlur
    });
  }

  render() {
    return (
      <div>
        <Header
          setBlur={ this.setBlur }
        />
        <CategoryWrapper
          isBackgroundBlur={ this.state.isBackgroundBlur }
        />
      </div>
    );
  }
}
