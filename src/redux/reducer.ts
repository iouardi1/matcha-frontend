import { AUTH_USER_BEGIN, AUTH_USER_SUCCESS, AUTH_USER_FAILURE } from './actionTypes';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case AUTH_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case AUTH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.users
      };

    case AUTH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}