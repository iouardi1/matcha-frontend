import toast from 'react-hot-toast';
import { authUserBegin, authUserSuccess, authUserFailure } from '../actions/actions';

export function authUser(data: any) {
  return dispatch => {
    dispatch(authUserBegin());
    return  fetch(`${process.env.API}/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          localStorage.setItem('accessToken', json.token);
          dispatch(authUserSuccess(json));
          window.location.href = '/profile';
        } else {
          throw new Error('Login failed: No token received');
        }
      })
      .catch(error => dispatch(authUserFailure(error)));
  };
}
export function registerUser(data: any) {
// toast.configure();

  return dispatch => {
    dispatch(authUserBegin());
    return  fetch(`${process.env.API}/auth/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(async response => {
      const json = await response.json();
      if (!response.ok) {
        throw json;
      }
      return json;
    })
    .then(json => {
      // dispatch(authUserSuccess({ users: json }));

      window.location.href = '/auth/login';
    })
    .catch(error => {
	    toast.error(error.statusText);
      dispatch(authUserFailure({ payload: error }));
    });
  };
}

// Helper function for error handling
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}