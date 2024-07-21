import { authUserBegin, authUserSuccess, authUserFailure } from './actions';

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
  return dispatch => {
    dispatch(authUserBegin());
    return  fetch(`${process.env.API}/auth/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
          window.location.href = '/auth/login';
      })
      .catch(error => dispatch(authUserFailure(error)));
  };
}

// Helper function for error handling
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}