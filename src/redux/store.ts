import { legacy_createStore as createStore , applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import profileReducer from './reducers/profileReducer';

export default createStore(
  profileReducer,
  applyMiddleware(thunk)
);