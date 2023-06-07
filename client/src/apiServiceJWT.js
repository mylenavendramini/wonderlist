const url = 'http://localhost:3001';


export async function register (user) {
  try {
    const res = await fetch(`${url}/register`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = res.json()
    return data;
  } catch (error) {
    console.log(error)
  }
}

export async function login (user) {
  try {
    const res = await fetch(`${url}/login`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = res.json()
    return data;
  } catch (error) {
    console.log(error)
  }
};

export async function profile (accessToken) {
  try {
    const res = await fetch(`${url}/profile`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = res.json()
    return data;
  } catch (error) {
    console.log(error)
  }
};

export async function logout (tokenName) {
  localStorage.removeItem(tokenName);
  try {
    const res = await fetch(`${url}/logout`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenName}`,
      },
    });
    const data = res.json()
    return data;
  } catch (error) {
    console.log(error)
  }
};
