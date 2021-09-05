import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppQuery } from './../../constant/category';
import { useQuery } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import CardPost from '../../components/UI/CardPost';
import styles from './style.module.scss';
const Categories = () => {
  const [pagi, setPagi] = useState({
    before: '',
    after: '',
  });

  const router = useRouter();
  const { category } = router.query;
  console.log('categories', category);

  const { loading, error, data, refetch } = useQuery(AppQuery, {
    variables: { after: '', before: '', first: 12, last: null, slug: category },
  });

  useEffect(() => {
    if (category !== undefined) {
      let newcategory = category !== 'category' ? category : null;
      refetch({
        first: 12,
        last: null,
        after: '',
        before: '',
        slug: newcategory,
      });
    }
  }, [category]);

  useEffect(() => {
    if (data) {
      setPagi({
        before: data.categories.pageInfo.hasPreviousPage,
        after: data.categories.pageInfo.hasNextPage,
      });
    }
  }, [data]);

  const renderLoading = () => {
    let xhtml = [];
    xhtml.push(<Skeleton style={{ margin: '20px 0' }} />);
    for (let i = 0; i < 12; i++) {
      xhtml.push(
        <div
          key={i + '-' + i}
          className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4 "
        >
          <Skeleton style={{ paddingBottom: '75%' }} duration={2} />
          <Skeleton duration={2} />
          <Skeleton count={4} duration={2} />
        </div>,
      );
    }
    return xhtml;
  };
  const renderCategoriesList = (categories) => {
    let xhtml = null;
    xhtml = categories.map((item) => {
      return (
        <>
          <Link key={item.node.id} href={`${item.node.uri}`}>
            <a className="custom-link">{item.node.name}</a>
          </Link>
          {item.node.posts.edges.map((post) => {
            return (
              <div
                key={post.node.id}
                className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4"
              >
                <CardPost
                  id={post.node.id}
                  link={post.node.uri}
                  title={post.node.title}
                  image={post.node.featuredImage.node.mediaItemUrl}
                  categories={post.node.categories}
                  views={post.node.views.views}
                />
              </div>
            );
          })}
        </>
      );
    });
    return xhtml;
  };

  if (loading)
    return (
      <div className={styles.wrapper}>
        <div className="row" style={{ margin: 0 }}>
          <h2
            style={{ fontSize: '22px', paddingBottom: '50px', fontWeight: 400 }}
          >
            Our Category
          </h2>
          ,{renderLoading()}
        </div>
      </div>
    );
  if (error) return `Error! ${error}`;
  return (
    <div className={styles.wrapper}>
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
        {data ? renderCategoriesList(data.categories.edges) : ''}
      </div>
    </div>
  );
};

export default Categories;
