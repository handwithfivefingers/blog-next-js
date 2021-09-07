import React from 'react';
import client from '../../../apollo-client';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import CardPost from '../../../components/UI/CardPost';
import Link from 'next/link';
const Categories = ({ cate }) => {
  const router = useRouter();
  console.log(cate);
  const renderCategoriesList = (categories) => {
    let xhtml = null;
    xhtml = categories.map((item) => {
      return (
        <>
          <Link key={item.id} href={`/blog${item.uri}`}>
            <a className="custom-link">{item.name}</a>
          </Link>
          {item.posts.nodes.map((post) => {
            return (
              <div
                key={post.id}
                className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4"
              >
                <CardPost
                  id={post.id}
                  link={`/blog${item.uri}${post.slug}`}
                  title={post.title}
                  image={post.featuredImage.node.mediaItemUrl}
                  categories={post.categories}
                  views={post.views.views}
                />
              </div>
            );
          })}
        </>
      );
    });
    return xhtml;
  };

  if (router.isFallback) return 'loading ....';
  return (
    <div>
      <div className={styles.wrapper}>
        {/* <Head>{yoastSeo}</Head> */}
        <div className="row" style={{ margin: 0 }}>
          <h2
            style={{
              fontSize: '22px',
              paddingBottom: '50px',
              fontWeight: 400,
            }}
          >
            Our Category
          </h2>
          {cate ? renderCategoriesList(cate) : ''}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async (context) => {
  const { data } = await client.query({
    query: gql`
      query MyQuery($slug: [String] = "") {
        categories(first: 999, where: { slug: $slug }) {
          nodes {
            id
            name
            slug
            uri
            posts {
              nodes {
                ...PostFragment
              }
            }
          }
        }
      }
      fragment PostFragment on Post {
        title
        slug
        id
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          edges {
            node {
              id
              name
              uri
            }
          }
        }
        views {
          views
        }
      }
    `,
    variables: {
      slug: context.params.category,
    },
  });
  return {
    props: {
      cate: data.categories.nodes,
    },
  };
};
export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        categories(first: 999) {
          nodes {
            id
            name
            slug
          }
        }
      }
    `,
  });
  const paths = data.categories.nodes.map((item) => {
    return {
      params: {
        category: item.slug.toString(),
        key: item.id,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export default Categories;
