import React from 'react';
import Image from 'next/image';
import PageHeader from '../UI/PageHeader';
import Skeleton from 'react-loading-skeleton';
import styles from './styles.module.scss';
const Content = (props) => {
  return (
    <>
      <div
        className={styles.page_image}
        style={{ backgroundImage: `url(${props.img})` }}
      >
        {props.img ? '' : <Skeleton height={200} />}
      </div>
      <div className="wrapper">
        <PageHeader title={props.title} />
        {props.content}
      </div>
    </>
  );
};

export default Content;
