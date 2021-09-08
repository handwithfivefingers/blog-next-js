import React from 'react';
import Skeleton from 'react-loading-skeleton';
import style from './style.module.scss';
const Loading = () => {
  return (
    <div className={style.loading}>
      <div className={style.pre_loading}>
        <div className={style.lds_ellipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
