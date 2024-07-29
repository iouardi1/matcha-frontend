import {PROFILE_FETCH_BEGIN, PROFILE_FETCH_SUCCESS, PROFILE_FETCH_FAILURE } from './types/profileActionsTypes';
 

export const profileFetchBegin = () => ({
  type: PROFILE_FETCH_BEGIN
});

export const profileFetchSuccess = (data:any) => ({
  type: PROFILE_FETCH_SUCCESS,
  payload: { data }
});

export const profileFetchFailure = (error:any) => ({
  type: PROFILE_FETCH_FAILURE,
  payload: { error }
});
