import gpl from 'graphql-tag';

export const PostsQuery = gpl`
query MyQuery($first: Int = 12, $last: Int = null, $before: String = "", $after: String = "") {
  posts(first: $first, after:$after, before:$before,last:$last) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
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
}
`;

export const FetchSinglePost = gpl`
query MyQuery($slug: String = "") {
      postBy(slug: $slug) {
        title
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        content
      }
    }
`;
export const SearchPostQuery = gpl`
query MyQuery($first: Int = 12, $last: Int = null, $before: String = "", $after: String = "") {
      posts(first: $first, after:$after, before:$before,last:$last) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            link
            title
            uri
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
    }
`;
