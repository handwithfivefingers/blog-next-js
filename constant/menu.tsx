

import { gql } from '@apollo/client';
import client from '../apollo-client';

export const menuQuery = client.query({
  query: gql`
  query MyQuery {
    menu(id: "dGVybToy") {
      id
      menuItems {
        edges {
          node {
            path
            label
          }
        }
      }
    }
  }
  `,
});
