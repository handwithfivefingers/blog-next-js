import React, { useContext, useEffect, useState } from 'react';
import { getSinglePage, Pages } from '../../constant/page';
// import { contactPage } from '../../constant/page';
import parser from 'react-html-parser';
import Head from 'next/head';
import styles from './style.module.scss';
import CarouselBanner from '../../components/UI/CarouselBanner';
import Content from '../../components/Content';
import { fetchProjectQuery } from '../../constant/posts';
import SkeletonLoading from '../../components/UI/SkeletonLoading';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserContext from '../../helper/Context';

import CardPostStyle1 from '../../components/UI/CardPost/CardPostStyle1';
import CardPostStyle2 from '../../components/UI/CardPost/CardPostStyle2';
import Skeleton from 'react-loading-skeleton';
import { GetServerSideProps } from 'next';

const baseURL = '/english';

const Project = (props) => {
  const [post, setPost] = useState(null);
  const [pagi, setPagi] = useState({
    after: false,
    end: '',
  });

  const { rowLayout } = useContext<any>(UserContext);

  useEffect(() => {
    fetchProjectPost({});
  }, []);

  const fetchProjectPost = async ({ first = 12, after = '' }) => {
    const { data } = await fetchProjectQuery({ first, after });
    // console.log(data);
    let defaultData = data.allProject.edges;
    let pageInfo = data.allProject.pageInfo;
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
      post?.length > 0 ? post.concat(defaultData) : defaultData || defaultData;
    setPost(() => Array.from(new Set(newData)));
  };

  const renderSectionTest = () => {
    let xhtml = null;
    let item = [
      {
        id: 1,
        title: 'Text Banner 1',
        image: 'https://i.ytimg.com/vi/L1tx-wAI6Nw/maxresdefault.jpg',
        categories: '',
        link: '',
        views: 1,
      },
      {
        id: 2,
        title: 'Text Banner 2',
        image: 'https://i.ytimg.com/vi/L1tx-wAI6Nw/maxresdefault.jpg',
        categories: '',
        link: '',
        views: 2,
      },
      {
        id: 3,
        title: 'Text Banner 3',
        image: 'https://i.ytimg.com/vi/L1tx-wAI6Nw/maxresdefault.jpg',
        categories: '',
        link: '',
        views: 3,
      },
      {
        id: 4,
        title: 'Text Banner 4',
        image: 'https://i.ytimg.com/vi/L1tx-wAI6Nw/maxresdefault.jpg',
        categories: '',
        link: '',
        views: 4,
      },
    ];
    xhtml = <CarouselBanner item={item} column={1} />;
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
  // console.log(post);
  return (
    <>
      <Head>{parser(props?.data.page.seo.fullHead)}</Head>
      <Content
        title="Project/Programs"
        carousel={
          <div className={styles.banner_scroll}>
            {renderSectionTest()}
            {/* <button className={styles.readMore}>Xem hết khóa học</button> */}
          </div>
        }
        content={
          post ? (
            <InfiniteScroll
              className="row"
              style={{ overflow: 'unset' }}
              dataLength={post?.length}
              next={() => fetchProjectPost({ after: pagi?.end })}
              hasMore={pagi.after}
              endMessage={<p>Found Nothing ...</p>}
              loader={<SkeletonLoading />}
            >
              {post?.map((item) => {
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
                        categories={item.node.projectCategories}
                        views={item.node.views.views}
                      />
                    ) : (
                      <CardPostStyle2
                        id={item.node.id}
                        link={`${item.node.uri}`}
                        title={item.node.title}
                        image={item.node.featuredImage?.node.mediaItemUrl}
                        categories={item.node.projectCategories}
                        views={item.node.views.views}
                      />
                    )}
                  </div>
                );
              })}
            </InfiniteScroll>
          ) : (
            renderLoading()
          )
        }
      />
    </>
  );
};

export default Project;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await getSinglePage(Pages.Project);
  return {
    props: {
      data: data,
      // relivadate: 60 * 60,
    },
  };
};
