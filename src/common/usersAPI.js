/* eslint-disable arrow-parens */
/* eslint-disable import/prefer-default-export */
const ENDPOINT = 'https://jsonplaceholder.typicode.com/users/';

export function getUsers() {
  return fetch(ENDPOINT)
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(json => json);
}
