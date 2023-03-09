import { URL } from './constants';

interface IOptions {
  method: string;
  headers: object;
  body?: string;
}

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

function request(endpoint: string, options: RequestInit) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(`${URL}${endpoint}`, options).then(checkResponse);
}

const headersContentType = { 'Content-Type': 'application/json' };
const headersAuthorization = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
});

//#region users

export const postUser = (userData: any) => {
  return fetch(`${URL}/api/users`, {
    method: 'POST',
    headers: headersAuthorization(),
    body: JSON.stringify(userData),
  }).then(checkResponse);
};

export const getUsers = () => {
  const options = {
    method: 'GET',
    headers: headersAuthorization(),
  };
  return request('/api/users', options);
};

export const putUser = (userData: any, id: number) => {
  return fetch(`${URL}/api/users/${id}`, {
    method: 'PUT',
    headers: headersAuthorization(),
    body: JSON.stringify(userData),
  }).then(checkResponse);
};

//#endregion

//#region comments

export const getComments = () => {
  return fetch(`${URL}/comments`, {
    method: 'GET',
    headers: headersAuthorization(),
  }).then(checkResponse);
};

export const deleteComment = (id: number) => {
  return fetch(`${URL}/comments/${id}`, {
    method: 'DELETE',
    headers: headersAuthorization(),
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
export const getToken = (code: string) => {
  return fetch(`${URL}/api/token`, {
    method: 'POST',
    headers: headersContentType,
    body: JSON.stringify({
      code: code,
    }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        return data;
      } else {
        return;
      }
    });
};

export const loginUser = () => {
  const options = {
    method: 'GET',
    headers: headersAuthorization(),
  };
  return request('/api/login', options);
  // return fetch(`${URL}/api/login`, {
  //   method: 'GET',
  //   headers: headersAuthorization(),
  // })
  //   .then(checkResponse)
  //   .then((data) => {
  //     if (data) {
  //       console.log(data);
  //       return data;
  //     } else {
  //       return;
  //     }
  //   });
};
