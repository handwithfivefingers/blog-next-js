import { gql } from '@apollo/client';
import client from './../apollo-client';
export const AppQuery = gql`
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

export const getCategoriesBySlug = ({
  after = '',
  first = 12,
  slug = null,
}) => {
  const query = client.query({
    query: gql`
      query MyQuery(
        $after: String
        $before: String
        $first: Int = 12
        $last: Int = null
        $slug: [String] = ""
      ) {
        categories(where: { slug: $slug }) {
          edges {
            node {
              name
              uri
              posts(
                first: $first
                last: $last
                before: $before
                after: $after
              ) {
                ...CategoryToPostConnectionFragment
                pageInfo {
                  startCursor
                  hasPreviousPage
                  hasNextPage
                  endCursor
                }
              }
            }
          }
        }
      }
      fragment NodeWithFeaturedImageToMediaItemConnectionEdgeFragment on NodeWithFeaturedImageToMediaItemConnectionEdge {
        node {
          mediaItemUrl
        }
      }
      fragment CategoryToPostConnectionFragment on CategoryToPostConnection {
        nodes {
          id
          title
          uri
          featuredImage {
            ...NodeWithFeaturedImageToMediaItemConnectionEdgeFragment
          }
          categories {
            edges {
              node {
                name
                uri
              }
            }
          }
          views {
            views
          }
        }
      }
    `,
    variables: {
      after,
      first,
      slug,
    },
  });
  return query;
};

export const getEnglishCategoriesSlug = ({
  after = '',
  first = 12,
  slug = null,
}) => {
  const query = client.query({
    query: gql`
      query MyQuery(
        $after: String
        $before: String
        $first: Int = 12
        $last: Int = null
        $slug: [String] = ""
      ) {
        allEnglishCategories(where: { slug: $slug }) {
          edges {
            node {
              name
              uri
              english(
                first: $first
                last: $last
                before: $before
                after: $after
              ) {
                ...EnglishCategoriesToEnglishConnectionFragment
                pageInfo {
                  startCursor
                  hasPreviousPage
                  hasNextPage
                  endCursor
                }
              }
            }
          }
        }
      }
      fragment NodeWithFeaturedImageToMediaItemConnectionEdgeFragment on NodeWithFeaturedImageToMediaItemConnectionEdge {
        node {
          mediaItemUrl
        }
      }
      fragment EnglishCategoriesToEnglishConnectionFragment on EnglishCategoriesToEnglishConnection {
        nodes {
          id
          title
          uri
          featuredImage {
            ...NodeWithFeaturedImageToMediaItemConnectionEdgeFragment
          }
          englishCategories {
            edges {
              node {
                name
                uri
              }
            }
          }
          views {
            views
          }
        }
      }
    `,
    variables: {
      after,
      first,
      slug,
    },
  });
  return query;
};


export const getProjectCategoriesSlug = ({
  after = '',
  first = 12,
  slug = null,
}) => {
  const query = client.query({
    query: gql`
      query MyQuery(
        $after: String
        $before: String
        $first: Int = 12
        $last: Int = null
        $slug: [String] = ""
      ) {
        allProjectCategories(where: { slug: $slug }) {
          edges {
            node {
              name
              uri
              project(
                first: $first
                last: $last
                before: $before
                after: $after
              ) {
                ...ProjectCategoriesToProjectConnectionFragment
                pageInfo {
                  startCursor
                  hasPreviousPage
                  hasNextPage
                  endCursor
                }
              }
            }
          }
        }
      }
      fragment NodeWithFeaturedImageToMediaItemConnectionEdgeFragment on NodeWithFeaturedImageToMediaItemConnectionEdge {
        node {
          mediaItemUrl
        }
      }
      fragment ProjectCategoriesToProjectConnectionFragment on ProjectCategoriesToProjectConnection {
        nodes {
          id
          title
          uri
          featuredImage {
            ...NodeWithFeaturedImageToMediaItemConnectionEdgeFragment
          }
          projectCategories {
            edges {
              node {
                name
                uri
              }
            }
          }
          views {
            views
          }
        }
      }
    `,
    variables: {
      after,
      first,
      slug,
    },
  });
  return query;
};
