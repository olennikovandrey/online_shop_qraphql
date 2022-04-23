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
  query Categories($productId: String!) {
    product(id: $productId) {
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
        currency {
          symbol
          label
        }
        amount
      }
      brand
    }
  }

`;

const GET_CURRENCY_CATEGORY = gql`
  query Category {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;

export { GET_SHOP, GET_PRODUCT, GET_CURRENCY_CATEGORY };
