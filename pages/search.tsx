import React from 'react';
import { useQuery } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';
import CardPost from '../components/UI/CardPost';
import { SearchPostQuery } from '../constant/posts';
import { useRouter } from 'next/router';
const Search = (props) => {
  const router = useRouter();
  const { loading, error, data } = useQuery(SearchPostQuery, {
    variables: { search: router.query.search },
  });

  const renderBlogPost = (posts) => {
    let xhtml = null;
    xhtml = posts.map((item) => {
      return (
        <div
          key={item.node.uri}
          className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4"
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
  console.log(router);
  // if (loading)
  //   return (
  //     <div className="container">
  //       <div className="row" style={{ padding: '50px 100px' }}>
  //         {renderLoading()}
  //       </div>
  //     </div>
  //   );
  return (
    <div>
      <div className="row" style={{ padding: '50px 100px' }}>
        <h2 style={{ fontSize: '22px', paddingBottom: '50px' }}>
          Tìm kiếm về: {router.query.search}
        </h2>
        {data ? renderBlogPost(data.posts.edges) : renderLoading()}
      </div>
    </div>
  );
};

export default Search;
