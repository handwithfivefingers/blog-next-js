import gpl from 'graphql-tag';
import { gql } from '@apollo/client';
import client from '../apollo-client';

export const PostsQuery = gpl`
query MyQuery($first: Int = 12, $last: Int = null, $before: String = "", $after: String = "") {
  posts(first: $first, after:$after, before:$before,last:$last) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      seo {
        schema {
          raw
        }
      }
    }
    edges {
      node {
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        id
        link
        title
        uri
        views {
          views
        }
        categories {
          edges {
            node {
              name
              uri
            }
          }
        }
      }
    }
  }
},
`;

export const FetchSinglePost = gpl`
query MyQuery($slug: String = "") {
      postBy(slug: $slug) {
        title
        content
        link
        postId
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          edges {
            node {
              name
            }
          }
        }
      }
    }
`;
export const SearchPostQuery = gpl`
query MyQuery($search: String = "") {
  posts(where: {search: $search}) {
    edges {
      node {
        id
        title
        uri
        views {
          views
        }
        categories {
          edges {
           node {
            uri
            name
           }
          }
        }

        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
}
`;

export const FetchAllPost = client.query({
  query: gql`
    query MyQuery {
      posts(first: 999) {
        nodes {
          ...PostFragment
          title
          categories {
            ...PostToCategoryConnectionFragment
          }
          uri
        }
      }
    }

    fragment PostFragment on Post {
      id
    }

    fragment CategoryFragment on Category {
      name
      uri
    }

    fragment PostToCategoryConnectionFragment on PostToCategoryConnection {
      nodes {
        ...CategoryFragment
      }
    }
  `,
});
