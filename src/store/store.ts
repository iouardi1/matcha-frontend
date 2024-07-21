import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import userReducer from '../redux/slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;