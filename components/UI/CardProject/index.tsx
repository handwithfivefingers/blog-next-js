import React from 'react';
import styles from './styles.module.scss';
import { FaEye, FaHeart, FaShare } from 'react-icons/fa';
const index = (props) => {
  return (
    <div className={styles.project_wrapper}>
      <div
        className={styles.project_img}
        style={{
          backgroundImage: `url(${props.img})`,
        }}
      >
        <div className={styles.project_content}>
          <h2>{props.title || 'Title'}</h2>
          <p>{props.author || 'Author'}</p>
        </div>
      </div>

      <div className={styles.project_footer}>
        <span>
          {props.like || '5'} <FaHeart />
        </span>
        <span>
          {props.views || '15'} <FaEye />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
};

export default index;
