import { gql } from '@apollo/client';
import client from '../apollo-client';

export const getPostQuery = ({ after, before, last, first }) => {
  const res = client.query({
    query: gql`
      query MyQuery(
        $first: Int = 12
        $last: Int = null
        $before: String = ""
        $after: String = ""
      ) {
        posts(first: $first, after: $after, before: $before, last: $last) {
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
    `,
    variables: { after, before, first, last },
    notifyOnNetworkStatusChange: true,
  });
  return res;
};

export const FetchSinglePost = gql`
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
export const SearchPostQuery = gql`
  query MyQuery($search: String = "") {
    posts(where: { search: $search }) {
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

export const searchQuery = ({ search, first, last, before, after }) => {
  const query = client.query({
    query: gql`
      query MyQuery(
        $search: String = null
        $after: String
        $before: String
        $first: Int = 12
        $last: Int = null
      ) {
        posts(
          first: $first
          last: $last
          before: $before
          after: $after
          where: { search: $search }
        ) {
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
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    `,
    variables: { search, first, last, before, after },
  });
  return query;
};
