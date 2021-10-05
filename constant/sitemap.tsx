import { gql } from '@apollo/client';
import client from '../apollo-client';

export const cateSitemap = client.query({
  query: gql`
    query MyQuery {
      categories {
        edges {
          node {
            id
            name
            uri
          }
        }
      }
    }
  `,
});
export const postSitemap = client.query({
  query: gql`
    query MyQuery {
      posts(first: 9999) {
        edges {
          node {
            uri
          }
        }
      }
    }
  `,
});
