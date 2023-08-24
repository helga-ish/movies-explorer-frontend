export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

function checkResponse(res) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(res);
}

export const getAllMovies = () => {
    return fetch(`${BASE_URL}`, {
    method: 'GET',
})
.then((res) => {
    return checkResponse(res);
});
}