import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import client from '../../../apollo-client';
import Content from '../../../components/Content';
import styles from './style.module.scss';
import Head from 'next/head';
import parser from 'react-html-parser';
const Post = ({ englishBy }) => {
  const router = useRouter();
  useEffect(() => {
    // Count views
    if (englishBy?.englishId) {
      const res = fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_POST_VIEW_URL}/${englishBy.englishId}`,
        {
          method: 'GET',
        },
      );
      res
        .then((res) => {
          // console.clear();
          console.log('done');
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }, [englishBy]);
  if (router.isFallback) {
    return (
      <div className="post-content row" style={{ margin: 0 }}>
        <div className={`col-12 post-header ${styles.header_content}`}>
          <h1 className={`title ${styles.title}`}>
            <Skeleton width={200} />
          </h1>
          <div className={styles.imageFeature}>
            <Skeleton height={200} />
          </div>
        </div>
        <div className="col-md-9 col-sm-12 col-xs-12">
          <Skeleton count={10} delay={0.5} style={{ margin: '0 auto' }} />
        </div>
        <div className="col-md-3 col-sm-12 col-xs-12">
          <Skeleton count={3} />
        </div>
      </div>
    );
  }
  return (
    <div>
      <Head> {parser(englishBy?.seo.fullHead)}</Head>
      <Content
        singlePost
        title={englishBy?.title}
        img={englishBy?.featuredImage?.node.mediaItemUrl}
        content={
          <div className="post-content row" style={{ margin: 0 }}>
            <div className={`col-12 post-header ${styles.header_content}`}>
              <h1 className={`title ${styles.title}`}>{englishBy?.title}</h1>
              {/* <div
                className={styles.imageFeature}
                style={{
                  backgroundImage: `url(${englishBy?.featuredImage?.node.mediaItemUrl})`,
                }}
              /> */}
            </div>
            <div className="row" style={{ padding: 0, margin: '0 auto' }}>
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: englishBy?.content,
                  }}
                />
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12">
                Related Post
                {/* <Sidebar categoryPost={router.query.category} /> */}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Post;

export const getStaticProps = async (context) => {
  const { data } = await client.query({
    query: gql`
      query MyQuery($slug: String = "") {
        englishBy(slug: $slug) {
          title
          content
          link
          englishId
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          seo {
            fullHead
          }
        }
      }
    `,
    variables: {
      slug: context.params.slug,
    },
  });
  return {
    props: {
      englishBy: data.englishBy,
      revalidate:60*60*24
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
