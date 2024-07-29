import { AUTH_USER_BEGIN, AUTH_USER_SUCCESS, AUTH_USER_FAILURE } from './types/actionTypes';

export const authUserBegin = () => ({
  type: AUTH_USER_BEGIN
});

export const authUserSuccess = users => ({
  type: AUTH_USER_SUCCESS,
  payload: { users }
});

export const authUserFailure = error => ({
  type: AUTH_USER_FAILURE,
  payload: { error }
});
