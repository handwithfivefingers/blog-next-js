import React, { useEffect, useState } from 'react';
import client from '../../../apollo-client';
import { gql } from '@apollo/client';
import {
  FetchAllPost,
  fetchPostBySlug,
  FetchSinglePost,
} from '../../../constant/posts';
import { FaSignLanguage } from 'react-icons/fa';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import Skeleton from 'react-loading-skeleton';
import Sidebar from '../../../components/Sidebar';
import { NextSeo } from 'next-seo';
import Content from '../../../components/Content';
import Link from 'next/link';
const Post = ({ postBy }) => {
  const router = useRouter();
  useEffect(() => {
    // Count views
    if (postBy?.postId) {
      const res = fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_POST_VIEW_URL}/${postBy.postId}`,
        {
          method: 'GET',
        },
      );
      res
        .then((res) => {
          // console.clear();
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
    // console.log(postBy);
  }, [postBy]);
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
      <NextSeo
        title={postBy?.title}
        description={postBy?.title}
        canonical={postBy?.link}
        openGraph={{
          url: postBy?.link,
          title: postBy?.title,
          description: postBy?.title,
          type: 'article',
          article: {
            publishedTime: '2017-06-21T23:04:13Z',
            modifiedTime: '2018-01-21T18:04:43Z',
            section: 'Section II',
          },
          images: [
            {
              url: postBy?.featuredImage?.node?.mediaItemUrl,
              width: 800,
              height: 600,
              alt: 'Featured Image',
            },
          ],
        }}
      />
      <Content
        singlePost
        title={postBy?.title}
        img={
          postBy?.featuredImage?.node.mediaItemUrl ||
          'https://i.ytimg.com/vi/L1tx-wAI6Nw/maxresdefault.jpg'
        }
        content={
          <div className="post-content row" style={{ margin: 0 }}>
            <div className={`col-12 post-header ${styles.header_content}`}>
              <h1 className={`title ${styles.title}`}>{postBy?.title}</h1>
              {/* <div
                className={styles.imageFeature}
                style={{
                  backgroundImage: `url(${postBy?.featuredImage?.node.mediaItemUrl})`,
                }}
              /> */}
            </div>
            <div className="row" style={{ padding: 0, margin: '0 auto' }}>
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: postBy?.content,
                  }}
                />
              </div>
              <div className={`col-md-12 ${styles.tag_component}`}>
                {postBy?.tags.edges.map((tag) => (
                  <Link
                    key={tag.node.slug}
                    href={{
                      pathname: '/story',
                      query: { tag: tag.node.slug },
                    }}
                  >
                    <a className={styles.tag}>{tag.node.name}</a>
                  </Link>
                ))}
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
  let { data } = await fetchPostBySlug({ slug: context.params.slug });
  // console.log(data);
  return {
    props: {
      postBy: data.postBy,
      revalidate: 60 * 60,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
    // fallback: true,
  };
};
