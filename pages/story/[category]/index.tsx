import React, { useEffect, useState } from 'react';
import client from '../../../apollo-client';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import CardPostStyle1 from '../../../components/UI/CardPost/CardPostStyle1';
import PageHeader from '../../../components/UI/PageHeader';
import Head from 'next/head';
import parser from 'react-html-parser';
import Skeleton from 'react-loading-skeleton';
import Loading from '../../../components/Loading';
import Content from '../../../components/Content';
const Categories = ({ cate }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
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
          slug: router.query.category,
        },
      });
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [router.query.category]);

  const renderCategoriesList = (postData) => {
    // console.log(router.query.category);
    let xhtml = null;
    // console.log(postData); // -> postdata === categories
    // categories.edges[0].node.posts.nodes  -> Post node Array
    xhtml = postData.edges[0].node.posts.nodes.map((post) => {
      return (
        <div
          key={post.id}
          className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4"
        >
          <CardPostStyle1
            id={post.id}
            link={post.uri}
            title={post.title}
            image={post.featuredImage?.node.mediaItemUrl}
            categories={post.categories}
            views={post.views.views}
          />
        </div>
      );
    });
    return xhtml;
  };

  const renderLoading = () => {
    let xhtml = [];
    for (let i = 0; i < 12; i++) {
      xhtml.push(
        <div className="col-3" key={`skeleton-${i}`}>
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
      {/* <div className={styles.wrapper}>
        <div className="row" style={{ margin: 0 }}>
          <PageHeader title={post?.categories.edges[0].node.name} /> */}
      {post ? (
        <Content
          title={post?.categories.edges[0].node.name}
          content={
            <div className={styles.wrapper}>
              <div className="row" style={{ margin: 0 }}>
                {renderCategoriesList(post?.categories)}
              </div>
            </div>
          }
        />
      ) : (
        <Content
          title={post?.categories.edges[0].node.name}
          content={
            <div className={styles.wrapper}>
              <div className="row" style={{ margin: 0 }}>
                {renderLoading()}
              </div>
            </div>
          }
        />
      )}
      {/* </div>
      </div> */}
    </div>
  );
};

export default Categories;

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
