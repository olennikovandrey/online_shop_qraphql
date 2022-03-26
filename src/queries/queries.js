import { gql } from "@apollo/client";

const GET_SHOP = gql`
  query category {
    products {
      name,
      gallery,
      prices {
        currency {
          symbol
        }
        amount
      }
      category
    }
  }
`

export default { GET_SHOP }
