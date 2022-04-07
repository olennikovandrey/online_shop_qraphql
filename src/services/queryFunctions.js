import client from "../apollo";
import * as query from "./queries";

async function getAllShop() {
  try {
    await client.query({
      query: query.GET_SHOP
    });
  } catch (err) {
    console.log( "getAllShop error:", err);
  }
}

export { getAllShop };
