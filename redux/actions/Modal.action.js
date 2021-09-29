import { Modal } from './../constants/Modal.contant';
const keys = {37: 1, 38: 1, 39: 1, 40: 1};
function preventDefault(e) {
  e.preventDefault();
}
function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

export const ShowupModal = (link) => {
  // window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  // window.addEventListener('touchmove', preventDefault, false); // mobile
  // window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  return (dispatch) => {
    dispatch({
      type: Modal.SHOW_UP,
      payload: {
        show: true,
        link
      }
    })
  }
}

export const HideModal = () => {
  // window.removeEventListener('DOMMouseScroll', preventDefault, false);
  // window.removeEventListener('touchmove', preventDefault, false);
  // window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  return (dispatch) => {
    dispatch({
      type: Modal.HIDE,
      payload: {
        show: false,
        link: null
      }
    })
  }
}