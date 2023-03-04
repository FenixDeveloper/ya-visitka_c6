import { URL } from "./constants";

const checkResponse = (res: Response) => {
    console.log(res)
    if (res.ok) {
        
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

const headersContentType = { "Content-Type": "application/json" };
const headersAuthorization = () => ({
    "Content-Type": "application/json",
    authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
});

//#region users

export const postUser = (userData: any) => {
    return fetch(`${URL}/users/`, {
        method: "POST",
        headers: headersContentType,//headersAuthorization(),
        body: JSON.stringify(userData),
    }).then(checkResponse);
};

export const getUsers = () => {
    return fetch(`${URL}/users`, {
        method: "GET",
        headers: headersContentType,//headersAuthorization(),
    }).then(checkResponse);
};

export const putUser = (userData: any, id: number) => {
    return fetch(`${URL}/users/${id}`, {
        method: "PUT",
        headers: headersContentType,//headersAuthorization(),
        body: JSON.stringify(userData),
    }).then(checkResponse);
};

//#endregion

//#region comments

export const getComments = () => {
    return fetch(`${URL}/comments`, {
        method: "GET",
        headers: headersContentType,//headersAuthorization(),
    }).then(checkResponse);
};

export const deleteComment = (id: number) => {
    return fetch(`${URL}/comments/${id}`, {
        method: "DELETE",
        headers: headersContentType,//headersAuthorization(),
    }).then(checkResponse);
};

//#endregion

//#region profiles

//#region id

//#region reactions
export const getReactions = (id: number) => {
    return fetch(`${URL}/profiles/${id}/reactions`, {
        method: "GET",
        headers: headersContentType,//headersAuthorization(),
    }).then(checkResponse);
};

export const postReactions = (profileData: any, id: number) => {
    return fetch(`${URL}/profiles/${id}/reactions`, {
        method: "POST",
        headers: headersContentType,//headersAuthorization(),
        body: JSON.stringify(profileData),
    }).then(checkResponse);
};
//#endregion

export const getProfile = (id: number) => {
    return fetch(`${URL}/profiles/${id}`, {
        method: "GET",
        headers: headersContentType,//headersAuthorization(),
    }).then(checkResponse);
};

export const patchProfile= (profileData: any, id: number) => {
    return fetch(`${URL}/profiles/${id}`, {
        method: "PATCH",
        headers: headersContentType,//headersAuthorization(),
        body: JSON.stringify(profileData),
    }).then(checkResponse);
};
//#endregion

export const getProfiles = () => {
    return fetch(`${URL}/profiles`, {
        method: "GET",
        headers: headersContentType,//headersAuthorization(),
    }).then(checkResponse);
};

  //#endregion
  export const authorization = async (code:string) => {
    return await fetch(`https://oauth.yandex.ru/token`, {
        mode: 'cors',
        method: "POST",
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': 'http://localhost:3000/',
            'grant_type': 'authorization_code',
            'code': code,
            'client_id': '0cdebeaa249342658d6f8a1f5eb5eb3e',
            'client_secret': '6aa9a1fa0acd402aa247912d561e3bdc'
        }
    }).then(checkResponse);
};
