const request = {
  url: "https://nomoreparties.co/v1/",
  token: "a1b07ad8-68b9-4aea-9bd1-7f4f85e9a697",
  cohortId: "wff-cohort-12",
};

const getMyProfileInfo = () => {
  return fetch(`${request.url}${request.cohortId}/users/me`, {
    headers: {
      authorization: request.token,
    },
  });
};

const updateProfileToServer = (name, about) => {
  fetch(`${request.url}${request.cohortId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: request.token,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};

const getCards = () => {
  return fetch(`${request.url}${request.cohortId}/cards`, {
    headers: {
      authorization: request.token,
    },
  });
};

const addNewCardToServer = (name, link) => {
  return fetch(`${request.url}${request.cohortId}/cards`, {
    method: "POST",
    headers: {
      authorization: request.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};

const deleteCardFromServer = (cardID) => {
  return fetch(`${request.url}${request.cohortId}/cards/${cardID}`, {
    method: "DELETE",
    headers: {
      authorization: request.token,
      "Content-Type": "application/json",
    },
  });
};

const likeCardRequest = (cardID) => {
  return fetch(`${request.url}${request.cohortId}//cards/likes/${cardID}`, {
    method: "PUT",
    headers: {
      authorization: request.token,
      "Content-Type": "application/json",
    },
  });
};

const unLikeCardRequest = (cardID) => {
  return fetch(`${request.url}${request.cohortId}//cards/likes/${cardID}`, {
    method: "DELETE",
    headers: {
      authorization: request.token,
      "Content-Type": "application/json",
    },
  });
};

export {
  getMyProfileInfo,
  updateProfileToServer,
  getCards,
  addNewCardToServer,
  deleteCardFromServer,
  likeCardRequest,
  unLikeCardRequest
};
