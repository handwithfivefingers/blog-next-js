import React from 'react';
import { AppQuery } from './../../constant/category';
import { useQuery } from '@apollo/client';
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
        <>
          {item.node.posts.edges.map((post, index) => {
            if (index > 4) {
              return;
            } else {
              return (
                <>
                  <Link href={`${post.node.uri}`} key={post.node.uri}>
                    <a className="sidebar-post">
                      <div className="sidebar-item mb-3 ">
                        <Image
                          src={post.node.featuredImage.node.mediaItemUrl}
                          layout="responsive"
                          width="200"
                          height="200"
                          alt="..."
                          unoptimized={true}
                        />
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
        </>
      );
    });
    return xhtml;
  };
  return (
    <div className="sticky" style={{ margin: '0' }}>
      <h2>{loading ? <Skeleton /> : 'Post cùng danh mục'}</h2>
      {data ? renderCategoriesList(data.categories.edges) : ''}
    </div>
  );
};

export default Sidebar;
