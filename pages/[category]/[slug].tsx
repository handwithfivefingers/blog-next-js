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
import { NextSeo } from 'next-seo';
const Post = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { loading, error, data, refetch } = useQuery(FetchSinglePost, {
    variables: { slug },
  });

  if (loading) {
    return (
      <div className="post-content row" style={{ margin: 0 }}>
        <div className="col-12 post-header">
          <h2 className="title ">
            <Skeleton />
          </h2>
          <div>
            <Skeleton height={200} />
          </div>
        </div>
        <div className="col-md-9 col-sm-12 col-xs-12">
          <Skeleton count={10} />
        </div>
        <div className="col-md-3 col-sm-12 col-xs-12">
          <Skeleton count={3} />
        </div>
      </div>
    );
  }
  return (
    <div>
      <NextSeo
        title={data?.postBy.title}
        description={data?.postBy.title}
        canonical={data?.postBy.link}
        openGraph={{
          url: data?.postBy.link,
          title: data?.postBy.title,
          description: data?.postBy.title,
          images: [
            {
              url: data?.postBy.featuredImage.node.mediaItemUrl,
              width: 800,
              height: 600,
              alt: 'Featured Image',
            },
          ],
          site_name: 'Truyền Mai Blog',
        }}
        // twitter={{
        //   handle: '@handle',
        //   site: '@site',
        //   cardType: 'summary_large_image',
        // }}
      />
      <Head>
        {/* <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" /> */}
        {/* <meta
          property="og:title"
          content={` ${data?.postBy.title} - Truyền Mai`}
        /> */}
        {/* <meta
          property="og:description"
          content={`Truyền Mai - ${data?.postBy.title}`}
        />
        <meta property="og:url" content={data?.postBy.link} />
        <meta property="og:site_name" content="Truyền Mai" />
        <meta
          property="article:section"
          content={`${data?.postBy.categories.edges[0].node.name}`}
        /> */}
        {/* <meta
          property="og:image:secure_url"
          content={data?.postBy.featuredImage.node.mediaItemUrl}
        /> */}
        {/* <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="200" /> */}
        {/* <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={} />
        <meta name="twitter:title" content={data?.postBy.title} />
        <meta
          name="twitter:image"
          content={data?.postBy.featuredImage.node.mediaItemUrl}
        />

        <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="post-content row" style={{ margin: 0 }}>
        <div className="col-12 post-header">
          <h2 className="title ">{data?.postBy.title || <Skeleton />}</h2>
          {data ? (
            <Image
              src={data?.postBy.featuredImage.node.mediaItemUrl}
              width={200}
              height={200}
              layout="responsive"
              unoptimized={true}
              alt="..."
            />
          ) : (
            <Skeleton height={200} />
          )}
        </div>

        <div className="col-md-9 col-sm-12 col-xs-12">
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
        <div className="col-md-3 col-sm-12 col-xs-12">
          <Sidebar categoryPost={router.query.category} />
        </div>
      </div>
    </div>
  );
};

export default Post;
