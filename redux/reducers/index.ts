import { combineReducers } from '@reduxjs/toolkit';
import ModalReducer from './Modal.reducer';

const rootReducer = combineReducers({
  ModalReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
