import { combineReducers } from 'redux';
import authReducer from './slices/authSlice' ;
import userReducer from './slices/userSlice' ;
// import other reducers if you have more

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  profile: profileReducer,
});

export default rootReducer;