const fetch = require('node-fetch');

const url = 'https://api.hooktheory.com/v1/users/auth';
const data = {
    "username": "alexmanayan",
    "password": "ManayanPiano21!"
};
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));    