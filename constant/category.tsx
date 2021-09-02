import gpl from 'graphql-tag';

export const AppQuery = gpl`
query MyQuery($after: String, $before: String, $first: Int = 12, $last: Int = null,$slug: [String] = null) {
  categories(first: $first, after:$after, before:$before,last:$last,where: {slug:$slug}) {
    edges {
      node {
        id
        name
        uri
        posts {
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
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`;
