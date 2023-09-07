export const BASE_URL = 'https://api.findmovies.explorer.nomoredomains.xyz';

function checkResponse(res) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject('Произошла ошибка.');
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})
  })
  .then((res) => {
    return checkResponse(res);
  });
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      mode: "cors",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then((res => checkResponse(res)))
    .then((data) => {
        localStorage.setItem('token', data.token);
        return data;
    })
  };

export const getEmail = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => {
        console.log(res);
      return checkResponse(res);
    });
  };

export const getProfileUserInfo = () => {
        return fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            mode: "cors",
            credentials: 'include',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'content-type': 'application/json'
              },
        }).then((res) => {
            return checkResponse(res);
        });
    }

export const changeProfileUserInfo = (data) => {
        return fetch(`${BASE_URL}/users/me`, {
            method: 'PATCH',
            mode: "cors",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'content-type': 'application/json'
              },
            body: JSON.stringify({
                email: data.email,
                name: data.name
            })
        }).then((res) => {
            return checkResponse(res);
        });
    }

export const saveMovie = (movie) => {
      return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'content-type': 'application/json'
          },
        body: JSON.stringify( movie )
    }).then((res) => {
        return checkResponse(res);
    });
}

export const deleteMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
}).then((res) => {
    return checkResponse(res);
});
}

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
}).then((res) => {
    return checkResponse(res);
});
}