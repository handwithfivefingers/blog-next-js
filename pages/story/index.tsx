import Aos from 'aos';
import 'aos/dist/aos.css';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import parser from 'react-html-parser';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import Content from '../../components/Content';
import CardPostStyle1 from '../../components/UI/CardPost/CardPostStyle1';
import CardPostStyle2 from '../../components/UI/CardPost/CardPostStyle2';
import SkeletonLoading from '../../components/UI/SkeletonLoading';
import { BlogPage } from '../../constant/page';
import { getPostQuery } from '../../constant/posts';
import UserContext from '../../helper/Context';
import styles from './style.module.scss';

type BLogType = {
  data: any;
  posts: any;
};

const Blog = (props) => {
  const [pagi, setPagi] = useState({
    after: false,
    end: '',
  });
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const { rowLayout } = useContext<any>(UserContext);

  useEffect(() => {
    Aos.init({ duration: 1200, delay: 100 });
  }, []);

  useEffect(() => {
    fetchSinglePost({});
  }, []);

  const fetchSinglePost = async ({
    first = 12,
    last = null,
    before = '',
    after = '',
  }) => {
    setLoading(true);

    const { data } = await getPostQuery({ first, last, before, after });
    let defaultData = data.posts.edges;
    let pageInfo = data.posts.pageInfo;
    setPagi((prevState) => {
      if (prevState.end == pageInfo.endCursor) {
        return prevState;
      } else {
        return {
          end: pageInfo.endCursor,
          after: pageInfo.hasNextPage,
        };
      }
    });
    let newData =
      posts?.length > 0
        ? posts.concat(defaultData)
        : defaultData || defaultData;
    setPosts(() => Array.from(new Set(newData)));
    setLoading(false);
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

  return (
    <>
      <Head>{parser(props?.page.seo.fullHead)}</Head>
      {posts ? (
        <Content
          img={props.page?.featuredImage?.node.sourceUrl}
          alt={''}
          title="Our Story"
          content={
            <div className={styles.wrapper}>
              <InfiniteScroll
                className="row"
                style={{ overflow: 'unset' }}
                dataLength={posts?.length}
                next={() => fetchSinglePost({ after: pagi?.end })}
                hasMore={pagi.after}
                endMessage={<p>Found Nothing ...</p>}
                loader={<SkeletonLoading />}
              >
                {posts?.map((item) => {
                  return (
                    <div
                      key={item.node.uri}
                      className={`${
                        rowLayout
                          ? 'col-lg-3 col-md-4 col-sm-6 col-6 mb-4'
                          : 'col-md-12'
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
                })}
              </InfiniteScroll>
            </div>
          }
        />
      ) : (
        <Content
          content={
            <div className={styles.wrapper}>
              <div className="row" style={{ margin: 0 }}>
                <h2 style={{ fontSize: '22px', paddingBottom: '50px' }}></h2>
                {renderLoading()}
              </div>
            </div>
          }
        />
      )}
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
