import { gql } from "@apollo/client";

const GET_SHOP = gql`
  query Categories {
    categories {
      name
      products {
        id
        name
        gallery
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`

const GET_PRODUCT = gql`
  query Product($productId: String!) {
    product(id: $productId) {
      id
      name
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`

export { GET_SHOP, GET_PRODUCT }
