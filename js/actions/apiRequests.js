import * as types from 'constants/actionTypes';

export function startRequest() {
  return { type: types.START_REQUEST };
}

export function endRequest() {
  return { type: types.END_REQUEST };
}

export function create(resType, attrs) {
  return dispatch => {
    const reqOptions = options('post', attrs);
    dispatch(startRequest());
    return fetch(`http://localhost:5000/api/v1/${resType}`, reqOptions)
      .then(req => {
        dispatch(endRequest());
        return req.json();
      })
  };
}

export function update(resType, id, attrs) {
  return dispatch => {
    const reqOptions = options('put', attrs);
    dispatch(startRequest());
    return fetch(`http://localhost:5000/api/v1/${resType}/${id}`, reqOptions)
      .then(req => {
        dispatch(endRequest());
        return req.json();
      })
  };
}

export function delete(resType, id) {
  return dispatch => {
    const reqOptions = options('delete');
    dispatch(startRequest());
    return fetch(`http://localhost:5000/api/v1/${resType}/${id}`, options)
      .then(req => {
        dispatch(endRequest());
        return req.json();
      })
  };
}

function options(method, body) {
  const object = {};
  object.method = method;
  object.headers = {
    "Content-Type": "application/json"
  };

  if (typeof body !== 'undefined') object.body = JSON.stringify(body);

  return object;
}

