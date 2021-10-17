import { gql } from '@apollo/client';
import client from '../apollo-client';
// Blog Post
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
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
  });
  return res;
};
//English Post
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
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
  });
  return res;
};
// Project Post
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
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
  });
  return res;
};
// Single Post
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
// Single Post
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

//Categories Relate Post
export const FetchPostRelative = ({ type, categoriesName }) => {
  let res = null;
  switch (type) {
    case 'post':
      return (res = client.query({
        query: gql`
          query MyQuery($categoriesName: String = "") {
            posts(first: 8, where: { categoryName: $categoriesName }) {
              edges {
                node {
                  id
                  uri
                  title
                  featuredImage {
                    node {
                      sourceUrl(size: MEDIUM)
                    }
                  }
                  views {
                    views
                  }
                }
              }
            }
          }
        `,
        variables: { categoriesName },
      }));
    case 'english':
      return (res = client.query({
        query: gql`
          query MyQuery($categoriesName: [String] = "") {
            allEnglishCategories(where: { slug: $categoriesName }) {
              edges {
                node {
                  english {
                    edges {
                      node {
                        uri
                        title
                        id
                        englishId
                        featuredImage {
                          node {
                            id
                            sourceUrl(size: MEDIUM)
                          }
                        }
                        views {
                          views
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { categoriesName },
      }));
    case 'project':
      return (res = client.query({
        query: gql`
          query MyQuery($categoriesName: [String] = "") {
            allProjectCategories(where: { slug: $categoriesName }) {
              edges {
                node {
                  project {
                    edges {
                      node {
                        uri
                        title
                        id
                        projectId
                        featuredImage {
                          node {
                            id
                            sourceUrl(size: MEDIUM)
                          }
                        }
                        views {
                          views
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { categoriesName },
      }));
    default:
      return res;
  }
};
// Search Post
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
