import React from 'react';
import Skeleton from 'react-loading-skeleton';
import style from './style.module.scss';
const Loading = (props) => {
  return (
    <div className={`${style.loading} ${props.active ? style.active : ''}`}>
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
