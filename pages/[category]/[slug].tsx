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
          type: 'article',
          article: {
            publishedTime: '2017-06-21T23:04:13Z',
            modifiedTime: '2018-01-21T18:04:43Z',
            section: 'Section II',
            // authors: [
            //   'https://www.example.com/authors/@firstnameA-lastnameA',
            //   'https://www.example.com/authors/@firstnameB-lastnameB',
            // ],
            // tags: ['Tag A', 'Tag B', 'Tag C'],
          },
          images: [
            {
              url: data?.postBy.featuredImage.node.mediaItemUrl,
              width: 800,
              height: 600,
              alt: 'Featured Image',
            },
          ],
        }}
      />
      {/* <NextSeo
        openGraph={{
          images: [],
          site_name: 'Truyền Mai Blog',
        }}
      /> */}
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
