import React from 'react';
import Image from 'next/image';
import PageHeader from '../UI/PageHeader';
import Skeleton from 'react-loading-skeleton';
import styles from './styles.module.scss';
import Breadcrumb from './../Breadcrumb';
const Content = (props) => {
  return (
    <>
      {props.carousel ? (
        props.carousel
      ) : (
        <div
          className={styles.page_image}
          style={{ backgroundImage: `url(${props.img})` }}
        >
          {props.img ? '' : <Skeleton height={300} />}
          <div className={styles.breadcrumb}>
            <Breadcrumb title={props.title} />
          </div>
        </div>
      )}
      <div className="wrapper">
        {props.singlePost ? '' : <PageHeader title={props.title} />}
        {props.content}
      </div>
    </>
  );
};

export default Content;
