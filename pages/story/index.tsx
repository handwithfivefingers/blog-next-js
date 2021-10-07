import React, { useState, useEffect, useContext } from 'react';
import { PostsQuery } from '../../constant/posts';
import { useQuery } from '@apollo/client';
import CardPostStyle1 from '../../components/UI/CardPost/CardPostStyle1';
import Skeleton from 'react-loading-skeleton';
import Head from 'next/head';
import styles from './style.module.scss';
import { BlogPage } from '../../constant/page';
import Aos from 'aos';
import 'aos/dist/aos.css';
import parser from 'react-html-parser';
import PageHeader from '../../components/UI/PageHeader';
import UserContext from '../../helper/Context';
import CardPostStyle2 from '../../components/UI/CardPost/CardPostStyle2';
import { GetServerSideProps } from 'next';
import Content from '../../components/Content';
type BLogType = {
  data: any;
  posts: any;
};
const Blog = (props) => {
  const [pagi, setPagi] = useState({
    before: '',
    after: '',
  });
  const { rowLayout } = useContext<any>(UserContext);
  const { loading, error, data, refetch } = useQuery(PostsQuery, {
    variables: { after: '', before: '', first: 12, last: null },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    Aos.init({ duration: 1200, delay: 100 });
  }, []);

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
          className={`${
            rowLayout ? 'col-lg-3 col-md-4 col-sm-6 col-6 mb-4' : 'col-md-12'
          }`}
        >
          {rowLayout ? (
            <CardPostStyle1
              id={item.node.id}
              link={`${item.node.uri}`}
              title={item.node.title}
              image={item.node.featuredImage?.node.mediaItemUrl}
              categories={item.node.categories}
              views={item.node.views.views}
            />
          ) : (
            <CardPostStyle2
              id={item.node.id}
              link={`${item.node.uri}`}
              title={item.node.title}
              image={item.node.featuredImage?.node.mediaItemUrl}
              categories={item.node.categories}
              views={item.node.views.views}
            />
          )}
        </div>
      );
    });
    return xhtml;
  };
  const renderLoading = () => {
    let xhtml = [];
    if (rowLayout) {
      for (let i = 0; i < 12; i++) {
        xhtml.push(
          <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4">
            <Skeleton style={{ paddingBottom: '75%' }} duration={2} />
            <Skeleton duration={2} />
            <Skeleton count={4} duration={2} />
          </div>,
        );
      }
    } else {
      for (let i = 0; i < 12; i++) {
        xhtml.push(
          <div key={i} className="col-md-12">
            <div className="row">
              <div className="col-md-3 col-4">
                <Skeleton height={150} duration={2} />
              </div>
              <div className="col-md-9 col-8">
                <Skeleton count={2} duration={2} />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Skeleton count={1} duration={2} />
                  <Skeleton count={1} duration={2} />
                </div>
              </div>
            </div>
          </div>,
        );
      }
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

  if (error) return `Error! ${error}`;
  return (
    <>
      <Head>{parser(props?.page.seo.fullHead)}</Head>
      <Content
        img={props.page?.featuredImage?.node.sourceUrl}
        alt={''}
        title="Our Story"
        content={
          (loading && (
            <div className="row" style={{ margin: 0 }}>
              {renderLoading()}
            </div>
          )) || (
            <div className="row" style={{ margin: 0 }}>
              {data ? renderBlogPost(data.posts.edges) : ''}
              <div className="pagination">
                <span
                  className={`prev-pagination ${
                    pagi.before ? 'active' : 'disabled'
                  }`}
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
                  className={`next-pagination ${
                    pagi.after ? 'active' : 'disabled'
                  }`}
                  onClick={() =>
                    data.posts.pageInfo.hasNextPage
                      ? onEventPagination({
                          after: data.posts.pageInfo.endCursor,
                        })
                      : ''
                  }
                >
                  Next
                </span>
              </div>
            </div>
          )
        }
      />
    </>
  );
};

export default Blog;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await BlogPage;
  return {
    props: data,
  };
};
