import { PROFILE_FETCH_BEGIN, PROFILE_FETCH_SUCCESS, PROFILE_FETCH_FAILURE } from '../actions/types/profileActionsTypes';

const initialState = {
  data: [],
  loading: false,
  error: null
};

export default function userReducer(state = initialState, action:any) {
  switch(action.type) {
    // case PROFILE_FETCH_BEGIN:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null
    //   };

    case PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };

    // case PROFILE_FETCH_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //     items: []
    //   };

    default:
      return state;
  }
}