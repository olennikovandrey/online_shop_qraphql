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
    prices {
      amount
      currency {
        label
        symbol
      }
    }
    brand
    attributes {
      items {
        displayValue
        value
        id
      }
      type
      name
      id
    }
  }
}
`

const GET_PRICES = gql`
  query Query {
  categories {
    products {
      prices {
        amount
        currency {
          symbol
          label
        }
      }
    }
  }
}
`

export { GET_SHOP, GET_PRODUCT, GET_PRICES }
