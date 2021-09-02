import React from 'react';
import { useRouter } from 'next/router';
import { FetchSinglePost } from './../../constant/posts';
import { AppQuery } from './../../constant/category';
import { useQuery } from '@apollo/react-hooks';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
const Post = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { loading, error, data, refetch } = useQuery(FetchSinglePost, {
    variables: { slug },
  });
  // const sidebarData = useQuery(AppQuery, {
  //   variables: {
  //     after: '',
  //     before: '',
  //     first: 12,
  //     last: null,
  //     slug: router.query.category,
  //   },
  // });
  // console.log(router.query);
  return (
    <div className="row">
      <Head>
        <title>{data?.postBy.title}</title>
        <meta
          name="description"
          content={data?.postBy.content.substring(0, 200).concat('...')}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="post-content">
        <div className="row">
          <div className="col-12 post-header">
            <h2 className="title ">{data?.postBy.title || <Skeleton />}</h2>
            <div className="featured-image">
              {data ? (
                <Image
                  src={data?.postBy.featuredImage.node.mediaItemUrl}
                  width={200}
                  height={200}
                  unoptimized={true}
                  alt="..."
                />
              ) : (
                <Skeleton height={200} />
              )}
            </div>
          </div>
          <div className="col-md-9">
            {data ? (
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: data?.postBy.content,
                }}
              />
            ) : (
              <Skeleton count={10} />
            )}
          </div>
          <div className="col-md-3">
            <Sidebar categoryPost={router.query.category} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
