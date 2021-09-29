import React from 'react';
import ModalVideo from 'react-modal-video';
import { useDispatch, useSelector } from 'react-redux';
import { HideModal } from '../../redux/actions';
import { useAppDispatch, useAppSelector } from '../../redux/store/hook';
const ModalVideos = (props) => {
  const ModalReducer = useAppSelector((state) => state.ModalReducer);
  const dispatch = useAppDispatch();
  if (ModalReducer.link) {
    return (
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={ModalReducer ? ModalReducer.show : false}
        videoId={ModalReducer?.link !== null ? ModalReducer.link : null}
        onClose={() => {
          console.log('close');
          dispatch(HideModal());
        }}
      />
    );
  } else {
    return null;
  }
};

export default ModalVideos;
