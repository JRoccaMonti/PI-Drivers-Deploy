import { configureStore } from '@reduxjs/toolkit'; 
import { rootReducer, initialState } from './reducer';

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
});

export default store;