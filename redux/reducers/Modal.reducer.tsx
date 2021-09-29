import { Modal } from '../constants/Modal.contant';
const initialState = {
  show: false,
  link: '',
};

export default function ModalReducer(state = initialState, action) {
  switch (action.type) {
    case Modal.SHOW_UP:
      return {
        ...state,
        show: action.payload.show,
        link: action.payload.link,
      };
    case Modal.HIDE:
      return {
        ...state,
        show: action.payload.show,
        link: null,
      };
    default:
      return {
        ...initialState,
      };
  }
}
