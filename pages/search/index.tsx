import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';
import CardPostStyle1 from '../../components/UI/CardPost/CardPostStyle1';
import { SearchPostQuery, searchQuery } from '../../constant/posts';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import Content from '../../components/Content';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonLoading from '../../components/UI/SkeletonLoading';
const Search = (props) => {
  const [post, setPost] = useState(null);
  const router = useRouter();

  const [pagi, setPagi] = useState({
    after: false,
    end: '',
  });

  useEffect(() => {
    fetchData({});
  }, [router.query.search]);

  const fetchData = async ({
    first = 12,
    last = null,
    before = '',
    after = '',
  }) => {
    const { data } = await searchQuery({
      first,
      last,
      before,
      after,
      search: router.query.search,
    });
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
      post?.length > 0 ? post.concat(defaultData) : defaultData || defaultData;
    setPost(() => Array.from(new Set(newData)));
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

  return post ? (
    <Content
      title={`Tìm kiếm về: ${router.query.search}`}
      content={
        <div className={styles.wrapper}>
          <div className="row" style={{ margin: 0 }}>
            <InfiniteScroll
              className="row"
              dataLength={post?.length}
              next={() => fetchData({ after: pagi?.end })}
              hasMore={pagi.after}
              endMessage={<p>Found Nothing ...</p>}
              loader={<SkeletonLoading />}
            >
              {post?.map((item) => {
                return (
                  <div
                    key={item.node.uri}
                    className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4"
                  >
                    <CardPostStyle1
                      id={item.node?.id}
                      link={`${item.node?.uri}`}
                      title={item.node?.title}
                      image={item.node?.featuredImage?.node?.mediaItemUrl}
                      categories={item.node?.categories}
                      views={item.node?.views.views}
                    />
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
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
  );
};

export default Search;

// export const getServerSideProps = async () => {

// }
