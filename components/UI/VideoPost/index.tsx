import React from 'react';
import Image from 'next/image';
import { useAppDispatch } from '../../../redux/store/hook';
import { ShowupModal } from '../../../redux/actions';
import style from './style.module.scss';
const VideoPost = ({ link }) => {
  const dispatch = useAppDispatch();
  const renderModal = (link) => {
    dispatch(ShowupModal(link));
  };
  return (
    <div className={style.video_post}>
      <div className={style.video_post_img}>
        <Image
          src={`https://img.youtube.com/vi/${link}/0.jpg`}
          layout="responsive"
          width="250"
          height="200"
          unoptimized={true}
          alt="..."
          onClick={(e) => {
            renderModal(link);
          }}
        />
      </div>
      <div className={style.video_post_content}>
        <h3 className={style.title}>Title</h3>
      </div>
    </div>
  );
};

export default VideoPost;
