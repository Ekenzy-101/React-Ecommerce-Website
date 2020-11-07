import { gql } from "@apollo/client";

export const USER = gql`
  query {
    user {
      _id
      firstname
      lastname
      tokenCount
    }
  }
`;

export const USER_CART = gql`
  query {
    user {
      _id
      carts
    }
  }
`;
