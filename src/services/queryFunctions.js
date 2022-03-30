import client from "../apollo";
import * as query from "./queries";

async function getAllShop() {
  const preloadedData = localStorage.getItem("shopData");
  if (!preloadedData) {
    try {
      await client.query({
        query: query.GET_SHOP
      })
      .then(result =>
      localStorage.setItem("shopData", JSON.stringify(result.data.categories)))
    } catch (err) {
      console.log( "getAllShop error:", err)
    }
  }
}

async function getProductDetails(id) {
  await client.query({
    query: query.GET_PRODUCT
  })
  .then(result =>
    sessionStorage.setItem("productDetails", JSON.stringify(result)))
  .catch (
    error => {
    console.log( "getProductDetails error:", error)
    })
}

export { getAllShop, getProductDetails }
