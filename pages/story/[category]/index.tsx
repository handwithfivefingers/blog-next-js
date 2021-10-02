import React, { useEffect, useState } from 'react';
import client from '../../../apollo-client';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import CardPostStyle1 from '../../../components/UI/CardPost/CardPostStyle1';
import Link from 'next/link';
import PageHeader from '../../../components/UI/PageHeader';
import Head from 'next/head';
import parser from 'react-html-parser';
import Skeleton from 'react-loading-skeleton';
const Categories = ({ cate }) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data } = await client.query({
        query: gql`
          query MyQuery($slug: [String] = "") {
            categories(where: { slug: $slug }) {
              edges {
                node {
                  name
                  uri
                  posts(first: 12, before: "", after: "") {
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
              link
            }
          }
          fragment CategoryToPostConnectionFragment on CategoryToPostConnection {
            nodes {
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
          slug: router.query.category,
        },
      });
      setData(data);
      setLoading(false);
    };
    fetchPost();
  }, []);

  const renderCategoriesList = (postData) => {
    console.log(router.query.category);
    let xhtml = null;
    console.log(postData); // -> postdata === categories
    // // categories.edges                  -> Categories node array
    // categories.edges[0].node.posts.nodes  -> Post node Array
    xhtml = postData.edges.map((cate) => {
      return cate.node.posts.nodes.map((post) => {
        return (
          <>
            {/* <Link key={post.id} href={post.uri}>
              <a className="custom-link">{post.name}</a>
            </Link> */}
            <div
              key={post.id}
              className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4"
            >
              <CardPostStyle1
                id={post.id}
                link={post.uri}
                title={post.title}
                image={post.featuredImage?.node.link}
                categories={post.categories}
                views={post.views.views}
              />
            </div>
          </>
        );
      });
    });
    return xhtml;
  };
  const renderLoading = () => {
    let xhtml = [];
    for (let i = 0; i < 12; i++) {
      xhtml.push(
        <div className="col-3">
          <Skeleton count={1} height={200} />
          <Skeleton count={4} />
        </div>,
      );
    }
    return xhtml;
  };
  return (
    <div>
      <Head>{parser(cate[0].seo.fullHead)}</Head>
      <div className={styles.wrapper}>
        <div className="row" style={{ margin: 0 }}>
          <PageHeader title={data?.categories.edges[0].node.name} />
          {data ? renderCategoriesList(data?.categories) : renderLoading()}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async (context) => {
  const { data } = await client.query({
    query: gql`
      query MyQuery($slug: [String] = "") {
        categories(first: 999, where: { slug: $slug }) {
          nodes {
            seo {
              fullHead
            }
          }
        }
      }
    `,
    variables: {
      slug: context.params.category,
    },
  });
  return {
    props: {
      cate: data.categories.nodes,
    },
  };
};
export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        categories(first: 999) {
          nodes {
            id
            name
            slug
          }
        }
      }
    `,
  });
  const paths = data.categories.nodes.map((item) => {
    return {
      params: {
        category: item.slug.toString(),
        key: item.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export default Categories;
