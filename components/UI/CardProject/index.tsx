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
          <h2>Title Project</h2>
          <p>Author</p>
        </div>
      </div>

      <div className={styles.project_footer}>
        <span>
          5 <FaHeart />
        </span>
        <span>
          15 <FaEye />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
};

export default index;
