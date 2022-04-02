import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import "../assets/styles/general.css";
import "../assets/styles/fonts.css";
import ProductPage from "./ProductPage/ProductPage";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="*" element={<Home />} />
          <Route path="/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    )
  }
}
