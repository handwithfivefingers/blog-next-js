import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import ModalReducer from '../reducers/Modal.reducer';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
// ...

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend()
      // prepend and concat calls can be chained
      .concat(thunk),
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
