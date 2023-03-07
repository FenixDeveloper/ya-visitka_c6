import { URL } from './constants';

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const headersContentType = { 'Content-Type': 'application/json' };
const headersAuthorization = () => ({
  'Content-Type': 'application/json',
  authorization: `Bearer ${localStorage.getItem('auth_token')}`,
});

//#region users

export const postUser = (userData: any) => {
  return fetch(`${URL}/users/`, {
    method: 'POST',
    headers: headersContentType, //headersAuthorization(),
    body: JSON.stringify(userData),
  }).then(checkResponse);
};

export const getUsers = () => {
  return fetch(`${URL}/users`, {
    method: 'GET',
    headers: headersContentType, //headersAuthorization(),
  }).then(checkResponse);
};

export const putUser = (userData: any, id: number) => {
  return fetch(`${URL}/users/${id}`, {
    method: 'PUT',
    headers: headersContentType, //headersAuthorization(),
    body: JSON.stringify(userData),
  }).then(checkResponse);
};

//#endregion

//#region comments

export const getComments = () => {
  return fetch(`${URL}/comments`, {
    method: 'GET',
    headers: headersContentType, //headersAuthorization(),
  }).then(checkResponse);
};

export const deleteComment = (id: number) => {
  return fetch(`${URL}/comments/${id}`, {
    method: 'DELETE',
    headers: headersContentType, //headersAuthorization(),
  }).then(checkResponse);
};

//#endregion

//#region profiles

//#region id

//#region reactions
export const getReactions = (id: number) => {
  return fetch(`${URL}/profiles/${id}/reactions`, {
    method: 'GET',
    headers: headersContentType, //headersAuthorization(),
  }).then(checkResponse);
};

export const postReactions = (profileData: any, id: number) => {
  return fetch(`${URL}/profiles/${id}/reactions`, {
    method: 'POST',
    headers: headersContentType, //headersAuthorization(),
    body: JSON.stringify(profileData),
  }).then(checkResponse);
};
//#endregion

export const getProfile = (id: number) => {
  return fetch(`${URL}/profiles/${id}`, {
    method: 'GET',
    headers: headersContentType, //headersAuthorization(),
  }).then(checkResponse);
};

export const patchProfile = (profileData: any, id: number) => {
  return fetch(`${URL}/profiles/${id}`, {
    method: 'PATCH',
    headers: headersContentType, //headersAuthorization(),
    body: JSON.stringify(profileData),
  }).then(checkResponse);
};
//#endregion

export const getProfiles = () => {
  return fetch(`${URL}/profiles`, {
    method: 'GET',
    headers: headersContentType, //headersAuthorization(),
  }).then(checkResponse);
};

//#endregion
export const loginUser = (code: string) => {
  let raw = JSON.stringify({
    "code": code
  });
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
  return fetch(`${URL}/api/token`, {
    mode: 'no-cors',
    method: "POST",
    headers: myHeaders,
    body: raw,
  })
    .then(checkResponse)
    .then((data) => {
      if (data.access_token) {
        localStorage.setItem("auth_token", data.access_token);
        return data;
      } else {
        return;
      }
    });
};
