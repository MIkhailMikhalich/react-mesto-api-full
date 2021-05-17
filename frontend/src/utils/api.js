class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers:  {
        Authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      'credentials': 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getProfile() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers:  {
        Authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      'credentials': 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setProfileData(name, info) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers:  {
        Authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      'credentials': 'include',
      body: JSON.stringify({
        name: name,
        about: info,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setProfileAvatar(src) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers:  {
        Authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      'credentials': 'include',
      body: JSON.stringify({
        avatar: src,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  postCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers:  {
        Authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      'credentials': 'include',

      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardID) {
    return fetch(`${this._url}cards/${cardID}`, {
      method: 'DELETE',
      headers:  {
        Authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      'credentials': 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  putLike(cardID) {
    return fetch(`${this._url}cards/${cardID}/likes`, {
      method: 'PUT',
      headers:  {
        Authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      'credentials': 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  unPutLike(cardID) {
    return fetch(`${this._url}cards/${cardID}/likes`, {
      method: 'DELETE',
      headers:  {
        Authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      'credentials': 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  changeLikeCardStatus(card, isLiked) {
    return fetch(`${this._url}cards/${card}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers:  {
        Authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      'credentials': 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
let jwt = localStorage.getItem('jwt');
const api = new Api({
  url: 'http://localhost:3001/',
  headers: {
    authorization: `${jwt}`,
    'Content-Type': 'application/json',
  },
});

export default api;
