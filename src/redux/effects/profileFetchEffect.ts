import { profileFetchBegin, profileFetchSuccess, profileFetchFailure} from '../actions/profileActions';

export function profileFetch(data:any) {
  return (dispatch:any) => {
    dispatch(profileFetchSuccess(data));
  };
}
