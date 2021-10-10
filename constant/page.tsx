import { gql } from '@apollo/client';
import client from '../apollo-client';

export const homeSeoQuery = client.query({
  query: gql`
    query MyQuery {
      page(id: "cG9zdDoy") {
        seo {
          fullHead
        }
      }
    }
  `,
});

export const homeQuery = client.query({
  query: gql`
    query MyQuery {
      page(id: "cG9zdDoy") {
        title
        frontpage {
          section1 {
            fieldGroupName
            section1Title
            section1Image {
              sourceUrl
            }
          }
          section2 {
            ...Page_Frontpage_Section2Fragment
          }
          section3 {
            ...Page_Frontpage_Section3Fragment
          }
        }
        seo {
          fullHead
        }
      }
    }

    fragment Page_Frontpage_Section3Fragment on Page_Frontpage_Section3 {
      section3LinkForward
      section3Slider {
        ... on Post {
          id
          title
          uri
          slug
          postId
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            edges {
              node {
                uri
                slug
                name
              }
            }
          }
        }
      }
      section3Title
    }

    fragment Page_Frontpage_Section2Fragment on Page_Frontpage_Section2 {
      section2Carousel
      section2LinkForward
      section2Linkid {
        section2LinkItem
      }
      section2Post {
        ... on Post {
          id
          title
          uri
          slug
          postId
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            edges {
              node {
                uri
                slug
                name
              }
            }
          }
        }
      }
      section2Title
    }
  `,
});

export const BlogPage = client.query({
  query: gql`
    query MyQuery {
      page(id: "cG9zdDo3") {
        seo {
          fullHead
        }
        featuredImage {
          node {
            id
            sourceUrl(size: MEDIUM_LARGE)
          }
        }
      }
    }
  `,
});

// export const contactPage = client.query({
//   query: gql``,
// });

// export const forEnglishPage = client.query({
//   query: gql``,
// });
export const getSinglePage = (id) => {
  const res = client.query({
    query: gql`
      query MyQuery($id: ID = "") {
        page(id: $id) {
          id
          title
          content(format: RENDERED)
          seo {
            fullHead
          }
        }
      }
    `,
    variables: {
      id,
    },
  });
  return res;
};
export const aboutUsPage = client.query({
  query: gql`
    query MyQuery {
      page(id: "cG9zdDoxMjk=") {
        id
        title
        content(format: RENDERED)
        seo {
          fullHead
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

export const Pages = {
  Home: 'cG9zdDoy',
  AboutUs: 'cG9zdDoxMjk=',
  Story: 'cG9zdDo3',
  Search: 'cG9zdDoyNTkz',
  ForEnglish: 'cG9zdDoyNjQz',
  Project: 'cG9zdDo3Mg==',
  ContactUs: 'cG9zdDoyMzA3',
};
