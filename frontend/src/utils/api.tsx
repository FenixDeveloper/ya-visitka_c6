import { URL } from './constants';
import { IProfile, IProfileData, IUserData } from './types';

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
  Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
});

//#region users
export const postUser = (userData: IUserData) => {
  const options = {
    method: 'POST',
    headers: headersAuthorization(),
    body: JSON.stringify(userData),
  };

  return request('/api/users', options);
};

export const getUsers = () => {
  const options = {
    method: 'GET',
    headers: headersAuthorization(),
  };

  return request('/api/users', options);
};

export const putUser = (userData: IUserData, id: number) => {
  const options = {
    method: 'PUT',
    headers: headersAuthorization(),
    body: JSON.stringify(userData),
  };

  return request(`/api/users/${id}`, options);
};
//#endregion

//#region comments
export const getComments = () => {
  const options = {
    method: 'GET',
    headers: headersAuthorization(),
  };

  return request('/api/comments', options);
};

export const deleteComment = (id: number) => {
  const options = {
    method: 'DELETE',
    headers: headersAuthorization(),
  };

  return request(`/api/comments/${id}`, options);
};
//#endregion

//#region profiles
export const getProfiles = () => {
  const options = {
    method: 'GET',
    headers: headersAuthorization(),
  };

  return request('/api/profiles', options);
};

export const getProfile = (id: number) => {
  const options = {
    method: 'GET',
    headers: headersAuthorization(),
  };

  return request(`/api/profiles/${id}`, options);
};

export const patchProfile = (profileData: IProfile, id: number) => {
  const options = {
    method: 'PATCH',
    headers: headersAuthorization(),
    body: JSON.stringify(profileData),
  };

  return request(`/api/profiles/${id}`, options);
};
//#endregion

//#region reactions
export const getReactions = (id: number) => {
  const options = {
    method: 'GET',
    headers: headersAuthorization(),
  };

  return request(`/api/profiles/${id}/reactions`, options);
};

export const postReactions = (profileData: IProfileData, id: number) => {
  const options = {
    method: 'POST',
    headers: headersAuthorization(),
    body: JSON.stringify(profileData),
  };

  return request(`/api/profiles/${id}/reactions`, options);
};
//#endregion

//#region upload file
export const uploadFiles = (file: File) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': file.type,
      'Content-Length': `${file.size}`,
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
    body: file,
  };

  return request('/api/uploadFiles', options);
};

export const getFile = (file: string) => {
  const options = {
    method: 'GET',
    headers: headersAuthorization(),
  };

  return request(`/api/uploadFiles/${file}`, options);
};
//#endregion

export const getToken = (code: string) => {
  const options = {
    method: 'POST',
    headers: headersContentType,
    body: JSON.stringify({
      code: code,
    }),
  };

  return request(`/api/token`, options).then((data) => {
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
};
