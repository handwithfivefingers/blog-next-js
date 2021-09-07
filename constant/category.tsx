import gpl from 'graphql-tag';
import { gql } from '@apollo/client';
import client from './../apollo-client';
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

export const CategoriesQuery = ({
  after = '',
  before = '',
  first = 12,
  last = null,
  slug = null,
}) => {
  const query = client.query({
    query: gql`
      query MyQuery(
        $after: String
        $before: String
        $first: Int = 12
        $last: Int = null
        $slug: [String] = null
      ) {
        categories(
          first: $first
          after: $after
          before: $before
          last: $last
          where: { slug: $slug }
        ) {
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
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    `,
    variables: {
      after,
      before,
      first,
      last,
      slug,
    },
  });
  return query;
};
