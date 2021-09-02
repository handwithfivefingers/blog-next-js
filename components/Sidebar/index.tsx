import React from 'react';
import { AppQuery } from './../../constant/category';
import { useQuery } from '@apollo/react-hooks';
import CardPost from '../UI/CardPost';
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
type SidebarType = {
  categoryPost: any;
};
const Sidebar: React.FC<SidebarType> = ({ categoryPost }) => {
  const { loading, error, data, refetch } = useQuery(AppQuery, {
    variables: {
      after: '',
      before: '',
      first: 12,
      last: null,
      slug: categoryPost,
    },
  });
  const renderCategoriesList = (data) => {
    let xhtml = null;
    xhtml = data.map((item, index) => {
      return (
        <div key={item.node.id}>
          {item.node.posts.edges.map((post, index) => {
            if (index > 4) {
              return;
            } else {
              return (
                <>
                  <Link href={`${post.node.uri}`} key={post.node.uri}>
                    <a className="row mb-3 sidebar-post">
                      <div key={post.node.id} className="col-md-4 p-0">
                        <Image
                          src={post.node.featuredImage.node.mediaItemUrl}
                          width={200}
                          height={200}
                          layout="responsive"
                          alt="..."
                          unoptimized={true}
                        />
                      </div>
                      <div className="col-md-8" style={{ alignSelf: 'center' }}>
                        <h5 style={{ fontSize: 17, color: '#333' }}>
                          {post.node.title.length > 30
                            ? post.node.title.substring(0, 30).concat('...')
                            : post.node.title}
                        </h5>
                      </div>
                    </a>
                  </Link>
                  {index == 4 ? (
                    <Link href={`${item.node.uri}`}>
                      <a className="btn">Xem thêm</a>
                    </Link>
                  ) : (
                    ''
                  )}
                </>
              );
            }
          })}
        </div>
      );
    });
    return xhtml;
  };
  return (
    <div className="sticky">
      <h2>{loading ? <Skeleton /> : 'Post cùng danh mục'}</h2>
      <ul>{data ? renderCategoriesList(data.categories.edges) : ''}</ul>
    </div>
  );
};

export default Sidebar;
