import React, { useState, useEffect } from 'react';
import { PostsQuery } from './../../constant/posts';
import { useQuery } from '@apollo/client';
import CardPost from '../../components/UI/CardPost';
import Skeleton from 'react-loading-skeleton';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import styles from './style.module.scss';
import parser from 'react-html-parser';
type BLogType = {
  data: any;
  posts: any;
};
const Blog = () => {
  const [pagi, setPagi] = useState({
    before: '',
    after: '',
  });

  const { loading, error, data, refetch } = useQuery(PostsQuery, {
    variables: { after: '', before: '', first: 12, last: null },
  });
  const { yoastSeo } = parser(data?.posts.pageInfo.seo.schema.raw);
  useEffect(() => {
    if (data) {
      setPagi({
        before: data.posts.pageInfo.hasPreviousPage,
        after: data.posts.pageInfo.hasNextPage,
      });
    }
  }, [data]);

  const renderBlogPost = (posts) => {
    let xhtml = null;
    xhtml = posts.map((item) => {
      return (
        <div
          key={item.node.uri}
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        >
          <CardPost
            id={item.node.id}
            link={item.node.uri}
            title={item.node.title}
            image={item.node.featuredImage.node.mediaItemUrl}
            categories={item.node.categories}
            views={item.node.views.views}
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
        <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4">
          <Skeleton style={{ paddingBottom: '75%' }} duration={2} />
          <Skeleton duration={2} />
          <Skeleton count={4} duration={2} />
        </div>,
      );
    }
    return xhtml;
  };
  const onEventPagination = ({
    first = 12,
    last = null,
    before = '',
    after = '',
  }) => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    refetch({ first, last, after, before });
  };
  if (loading)
    return (
      <div className={styles.wrapper}>
        <div className="row" style={{ margin: 0 }}>
          <h2
            style={{ fontSize: '22px', paddingBottom: '50px', fontWeight: 400 }}
          >
            Our Blog
          </h2>
          {renderLoading()}
        </div>
      </div>
    );
  if (error) return `Error! ${error}`;
  return (
    <>
      <Head>{yoastSeo}</Head>
      <div className={styles.wrapper}>
        <div className="row" style={{ margin: 0 }}>
          <h2
            style={{ fontSize: '22px', paddingBottom: '50px', fontWeight: 400 }}
          >
            Our Blog
          </h2>
          {data ? renderBlogPost(data.posts.edges) : ''}
        </div>
        <div className="pagination">
          <span
            className={`prev-pagination ${pagi.before ? 'active' : 'disabled'}`}
            onClick={() =>
              data.posts.pageInfo.hasPreviousPage
                ? onEventPagination({
                    before: data.posts.pageInfo.startCursor,
                    last: 12,
                    first: null,
                  })
                : ''
            }
          >
            Previous
          </span>
          <span
            className={`next-pagination ${pagi.after ? 'active' : 'disabled'}`}
            onClick={() =>
              data.posts.pageInfo.hasNextPage
                ? onEventPagination({ after: data.posts.pageInfo.endCursor })
                : ''
            }
          >
            Next
          </span>
        </div>
      </div>
    </>
  );
};

export default Blog;
