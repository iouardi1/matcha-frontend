import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;