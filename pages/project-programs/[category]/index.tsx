import { gql } from '@apollo/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import parser from 'react-html-parser';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import client from '../../../apollo-client';
import Content from '../../../components/Content';
import CardPostStyle1 from '../../../components/UI/CardPost/CardPostStyle1';
import CardPostStyle2 from '../../../components/UI/CardPost/CardPostStyle2';
import SkeletonLoading from '../../../components/UI/SkeletonLoading';
import { getProjectCategoriesSlug } from '../../../constant/category';
import UserContext from '../../../helper/Context';
import styles from './style.module.scss';
const Categories = ({ cate }) => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const { rowLayout } = useContext<any>(UserContext);
  const [title, setTitle] = useState('');
  const [pagi, setPagi] = useState({
    after: false,
    end: '',
  });

  useEffect(() => {
    fetchPost({});
  }, [router.query.category]);

  const fetchPost = async ({ first = 12, after = '' }) => {
    const { data } = await getProjectCategoriesSlug({
      first,
      slug: router.query.category,
      after,
    });
    console.log('data', data);
    let defaultData = data.allProjectCategories.edges[0].node.project.nodes;
    let pageInfo = data.allProjectCategories.edges[0].node.project.pageInfo;
    title == data.allProjectCategories.edges[0].node.name
      ? ''
      : setTitle(data.allProjectCategories.edges[0].node.name);
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
  console.log(post);
  return (
    <div>
      <Head>{parser(cate[0].seo.fullHead)}</Head>
      {post ? (
        <Content
          title={title}
          content={
            <div className={styles.wrapper}>
              <InfiniteScroll
                className="row"
                style={{ overflow: 'unset' }}
                dataLength={post?.length}
                next={() => fetchPost({ after: pagi?.end })}
                hasMore={pagi.after}
                endMessage={<p>Found Nothing ...</p>}
                loader={<SkeletonLoading />}
              >
                {post?.map((item) => {
                  return (
                    <div
                      key={item.uri}
                      className={`${
                        rowLayout
                          ? 'col-lg-3 col-md-4 col-sm-6 col-6 mb-4'
                          : 'col-md-12'
                      }`}
                    >
                      {rowLayout ? (
                        <CardPostStyle1
                          id={item.id}
                          link={item.uri}
                          title={item.title}
                          image={item.featuredImage?.node.mediaItemUrl}
                          categories={item.projectCategories}
                          views={item.views.views}
                        />
                      ) : (
                        <CardPostStyle2
                          id={item.id}
                          link={`${item.uri}`}
                          title={item.title}
                          image={item.featuredImage?.node.mediaItemUrl}
                          categories={item.projectCategories}
                          views={item.views.views}
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
    </div>
  );
};

export default Categories;

export const getStaticProps = async (context) => {
  const { data } = await client.query({
    query: gql`
      query MyQuery($slug: [String] = "") {
        allProjectCategories(first: 999, where: { slug: $slug }) {
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
      cate: data.allProjectCategories.nodes,
      relivadate: 60 * 60,
    },
  };
};

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        allProjectCategories(first: 999) {
          nodes {
            id
            name
            slug
          }
        }
      }
    `,
  });
  const paths = data.allProjectCategories.nodes.map((item) => {
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
