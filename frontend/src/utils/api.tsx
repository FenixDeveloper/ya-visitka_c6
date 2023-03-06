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
  return fetch(`${URL}/api/login`, {
    mode: 'cors',
    method: "POST",
    headers: headersContentType,
    body: JSON.stringify({ code }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.access_token) {
        sessionStorage.setItem("auth_token", data.access_token);
        return data;
      } else {
        return;
      }
    });
};


export const authorization = async (code: string) => {

  let urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'authorization_code');
  urlencoded.append('code', code);
  urlencoded.append('client_id', '0cdebeaa249342658d6f8a1f5eb5eb3e');
  urlencoded.append('client_secret', '6aa9a1fa0acd402aa247912d561e3bdc');

  return await fetch(`https://oauth.yandex.ru/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: urlencoded,
  }).then(checkResponse);
};
