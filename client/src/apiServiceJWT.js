const url = 'http://localhost:3001';

const apiServiceJWT = {};

apiServiceJWT.register = (user) => {
  return fetch(`${url}/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

apiServiceJWT.login = (user) => {
  return fetch(`${url}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiServiceJWT.profile = (accessToken) => {
  return fetch(`${url}/profile`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiServiceJWT.logout = (tokenName) => {
  localStorage.removeItem(tokenName);
};

export default apiServiceJWT;
