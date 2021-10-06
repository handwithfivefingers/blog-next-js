import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';
import CardPostStyle1 from '../../components/UI/CardPost/CardPostStyle1';
import { SearchPostQuery, searchQuery } from '../../constant/posts';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import Content from '../../components/Content';
const Search = (props) => {
  const [post, setPost] = useState(null);
  const router = useRouter();

  const [pagi, setPagi] = useState({
    before: false,
    after: false,
    start: '',
    end: '',
  });

  useEffect(() => {
    fetchData({});
  }, [router.query.search]);

  useEffect(() => {
    let pageInfo = post?.posts.pageInfo;
    pageInfo &&
      setPagi({
        before: pageInfo.hasPreviousPage,
        start: pageInfo.startCursor,
        end: pageInfo.endCursor,
        after: pageInfo.hasNextPage,
      });
  }, [post]);

  const renderBlogPost = (posts) => {
    let xhtml = null;
    xhtml = posts.map((item) => {
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
    });
    return xhtml;
  };

  const fetchData = async ({
    first = 12,
    last = null,
    before = '',
    after = '',
  }) => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const { data } = await searchQuery({
      first,
      last,
      before,
      after,
      search: router.query.search,
    });
    setPost(data);
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
            <h2 style={{ fontSize: '22px', paddingBottom: '50px' }}></h2>
            {renderBlogPost(post.posts.edges)}
            <div className="pagination">
              <span
                className={`prev-pagination ${
                  pagi.before ? 'active' : 'disabled'
                }`}
                onClick={() => {
                  pagi?.before
                    ? fetchData({
                        first: null,
                        last: 12,
                        before: pagi?.start,
                      })
                    : '';
                }}
              >
                Previous
              </span>
              <span
                className={`next-pagination ${
                  pagi.after ? 'active' : 'disabled'
                }`}
                onClick={() => {
                  pagi?.end ? fetchData({ after: pagi?.end }) : '';
                }}
              >
                Next
              </span>
            </div>
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
