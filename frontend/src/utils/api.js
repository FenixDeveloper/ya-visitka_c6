import { URL } from "./constants";

const checkResponse = (res) => {
    if (res.ok || res.created) {
        return res.json();
    }
    return res.json().then((err) => {
        return Promise.reject(err);
    });
};

const headersContentType = { "Content-Type": "application/json" };
const headersAuthorization = () => ({
    "Content-Type": "application/json",
    authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
});

//#region users

export const postUser = (userData) => {
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

export const putUser = (userData, id) => {
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

export const deleteComment = (id) => {
    return fetch(`${URL}/comments/${id}`, {
        method: "DELETE",
        headers: headersContentType,//headersAuthorization(),
    }).then(checkResponse);
};

//#endregion

//#region profiles

//#region id

//#region reactions
export const getReactions = (id) => {
    return fetch(`${URL}/profiles/${id}/reactions`, {
        method: "GET",
        headers: headersContentType,//headersAuthorization(),
    }).then(checkResponse);
};

export const postReactions = (id) => {
    return fetch(`${URL}/profiles/${id}/reactions`, {
        method: "POST",
        headers: headersContentType,//headersAuthorization(),
        body: JSON.stringify(profileData),
    }).then(checkResponse);
};
//#endregion

export const getProfile = (id) => {
    return fetch(`${URL}/profiles/${id}`, {
        method: "GET",
        headers: headersContentType,//headersAuthorization(),
    }).then(checkResponse);
};

export const patchProfile= (profileData, id) => {
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