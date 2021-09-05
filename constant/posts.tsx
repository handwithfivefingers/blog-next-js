import gpl from 'graphql-tag';

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
}
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
