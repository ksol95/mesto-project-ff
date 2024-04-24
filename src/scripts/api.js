const OKcontentType = ["image/webp", "image/jpeg", "image/gif", "image/jpg"];
const requestConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "a1b07ad8-68b9-4aea-9bd1-7f4f85e9a697",
    "Content-Type": "application/json",
  },
};

const getMyProfileInfo = () => {
  return fetch(`${requestConfig.baseUrl}/users/me`, {
    headers: requestConfig.headers,
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  });
};

const updateProfileToServer = (name, about) => {
  return fetch(`${requestConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: requestConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  });
};

const getCards = () => {
  return fetch(`${requestConfig.baseUrl}/cards`, {
    headers: requestConfig.headers,
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  });
};

const addNewCardToServer = (name, link) => {
  return fetch(`${requestConfig.baseUrl}/cards`, {
    method: "POST",
    headers: requestConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  });
};

const deleteCardFromServer = (cardID) => {
  return fetch(`${requestConfig.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: requestConfig.headers,
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  });
};

const likeCardRequest = (cardID) => {
  return fetch(`${requestConfig.baseUrl}//cards/likes/${cardID}`, {
    method: "PUT",
    headers: requestConfig.headers,
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  });
};

const unLikeCardRequest = (cardID) => {
  return fetch(`${requestConfig.baseUrl}//cards/likes/${cardID}`, {
    method: "DELETE",
    headers: {
      authorization: "a1b07ad8-68b9-4aea-9bd1-7f4f85e9a697",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  });
};

const updateAvatarToServer = (image) => {
  return fetch(`${requestConfig.baseUrl}/users/me/avatar `, {
    method: "PATCH",
    headers: requestConfig.headers,
    body: JSON.stringify({
      avatar: image,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
};


//Неработает исправить
const itImage = (url) => {
  return fetch(url, {
    method: "HEAD",
  }).then((res) => {
    const contentType = res.headers.get("Content-Type");
    if (OKcontentType.some((type) => type === contentType) && res.ok) {
      return res.url;
    }
    return Promise.reject(contentType);
  });
};

export {
  getMyProfileInfo,
  updateProfileToServer,
  getCards,
  addNewCardToServer,
  deleteCardFromServer,
  likeCardRequest,
  unLikeCardRequest,
  updateAvatarToServer,
  itImage,
};