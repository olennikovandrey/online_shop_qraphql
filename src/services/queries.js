import { gql } from "@apollo/client";

const GET_SHOP = gql`
  query Query {
  categories {
    name
    products {
      id
      name
      inStock
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
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
}
`;

const GET_PRODUCT = gql`
  query Product($productId: String!) {
  product(id: $productId) {
    id
    name
    inStock
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
`;

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
`;

export { GET_SHOP, GET_PRODUCT, GET_PRICES };
