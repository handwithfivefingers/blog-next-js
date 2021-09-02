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
    <div className="container">
      <Head>
        <title>{data?.postBy.title}</title>
        <meta name="description" content={data?.postBy.title} />
        <meta name="description" content={data?.postBy.title} />
        <link rel="canonical" href={data?.postBy.link} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={` ${data?.postBy.title} - Truyền Mai`}
        />
        <meta
          property="og:description"
          content={`Truyền Mai - ${data?.postBy.title}`}
        />
        <meta property="og:url" content={data?.postBy.link} />
        <meta property="og:site_name" content="Truyền Mai" />
        <meta
          property="article:section"
          content={`${data?.postBy.categories.edges[0].node.name}`}
        />
        {/* <meta
          property="article:published_time"
          content="2021-08-31T03:20:11+00:00"
        />
        <meta
          property="article:modified_time"
          content="2021-08-31T03:24:18+00:00"
        />
        <meta property="og:updated_time" content="2021-08-31T03:24:18+00:00" /> */}
        <meta
          property="og:image"
          content={data?.postBy.featuredImage.node.mediaItemUrl}
        />
        <meta
          property="og:image:secure_url"
          content={data?.postBy.featuredImage.node.mediaItemUrl}
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="200" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={data?.postBy.title} />
        <meta name="twitter:title" content={data?.postBy.title} />
        <meta
          name="twitter:image"
          content={data?.postBy.featuredImage.node.mediaItemUrl}
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="row">
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
    </div>
  );
};

export default Post;
