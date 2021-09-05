import { gql } from '@apollo/client';
import client from '../apollo-client';

export const homeQuery = client.query({
  query: gql`
    query MyQuery {
      page(id: "cG9zdDo5OTA=") {
        isFrontPage
        title
        id
        seo {
          fullHead
        }
      }
    }
  `,
});

export const BlogPage = client.query({
  query: gql`
    query MyQuery {
      page(id: "cG9zdDoxMDI=") {
        seo {
          fullHead
        }
      }
    }
  `,
});

export const categoriesPage = client.query({
  query: gql`
    query MyQuery {
      categories {
        pageInfo {
          seo {
            schema {
              raw
            }
          }
        }
      }
    }
  `,
});

export const catePage = client.query({
  query: gql`
    query MyQuery($slug: [String] = null) {
      categories(where: { slug: $slug }) {
        edges {
          node {
            seo {
              fullHead
            }
          }
        }
      }
    }
  `,
});
