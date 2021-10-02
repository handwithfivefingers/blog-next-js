import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';
import CardPostStyle1 from '../../components/UI/CardPost/CardPostStyle1';
import { SearchPostQuery, searchQuery } from '../../constant/posts';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
const Search = (props) => {
  const [data, setData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await searchQuery(router.query.search);
      setData(data);
    };
    fetchData();
  }, [router.query.search]);
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
  console.log('router', router.query.search, data);
  return (
    <div className={styles.wrapper}>
      <div className="row" style={{ margin: 0 }}>
        <h2 style={{ fontSize: '22px', paddingBottom: '50px' }}>
          Tìm kiếm về: {router.query.search}
        </h2>
        {data ? renderBlogPost(data.posts.edges) : renderLoading()}
      </div>
    </div>
  );
};

export default Search;

// export const getServerSideProps = async () => {

// }
