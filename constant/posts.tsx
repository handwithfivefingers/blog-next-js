import { gql } from '@apollo/client';
import client from '../apollo-client';

export const getPostQuery = ({ after, before, last, first, tag }) => {
  const res = client.query({
    query: gql`
      query MyQuery(
        $first: Int = 12
        $last: Int = null
        $before: String = ""
        $after: String = ""
        $tag: [String] = null
      ) {
        posts(
          first: $first
          after: $after
          before: $before
          last: $last
          where: { tagSlugIn: $tag }
        ) {
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
    variables: { after, before, first, last, tag },
    // notifyOnNetworkStatusChange: true,
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

export const fetchEnglishQuery = ({ first, after }) => {
  const res = client.query({
    query: gql`
      query MyQuery($after: String, $first: Int = 12) {
        allEnglish(first: $first, after: $after) {
          edges {
            node {
              id
              title
              slug
              uri
              views {
                views
              }
              featuredImage {
                node {
                  sourceUrl(size: MEDIUM)
                }
              }
              englishCategories {
                edges {
                  node {
                    name
                    uri
                  }
                }
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            seo {
              schema {
                raw
              }
            }
          }
        }
      }
    `,
    variables: {
      first,
      after,
    },
  });
  return res;
};
export const fetchProjectQuery = ({ first, after }) => {
  const res = client.query({
    query: gql`
      query MyQuery($after: String, $first: Int = 12) {
        allProject(first: $first, after: $after) {
          edges {
            node {
              id
              title
              slug
              uri
              views {
                views
              }
              featuredImage {
                node {
                  sourceUrl(size: MEDIUM)
                }
              }
              projectCategories {
                edges {
                  node {
                    name
                    uri
                  }
                }
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            seo {
              schema {
                raw
              }
            }
          }
        }
      }
    `,
    variables: {
      first,
      after,
    },
  });
  return res;
};

export const fetchPostBySlug = ({ slug }) => {
  const res = client.query({
    query: gql`
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
          tags {
            edges {
              node {
                name
                slug
              }
            }
          }
        }
      }
    `,
    variables: {
      slug,
    },
  });
  return res;
};

export const fetchPostsByTag = ({ tag }) => {
  const res = client.query({
    query: gql`
      query MyQuery($tag: [String] = "") {
        posts(where: { tagSlugIn: $tag }) {
          edges {
            node {
              id
              uri
              title
              featuredImage {
                node {
                  sourceUrl
                }
              }
              views {
                views
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `,
    variables: { tag },
  });
  return res;
};

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
