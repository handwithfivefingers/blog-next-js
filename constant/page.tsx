import gql from 'graphql-tag';

export const HomePage = gql`
  query MyQuery {
    page(id: "cG9zdDo5OTA=") {
      isFrontPage
      title
      id
      seo {
        fullHead
      }
    }
  }
`;
