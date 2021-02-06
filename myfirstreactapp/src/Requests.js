
const Data = {};
const baseUrl = 'http://localhost:3001'



Data.logIn =  async (username, password) => {
  console.log('Requests.js  Log In')
  console.log(username, password)
  const url = `${baseUrl}/login`;
  const body = {'username': username, 
                'password': password}

  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      withCredentials: true
    },
  }).then((response) => {
    if (!response.ok) {
      return new Promise((resolve) => resolve([]));
    }
    return response.json().then((jsonResponse) => {
      console.log(jsonResponse)
      return jsonResponse;
    });
  });
};

Data.newUser = async (username, password, email) => {
  const url = `${baseUrl}/register`;
  const body = {'username': username, 
  'password': password, 
  'email': email}

  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      withCredentials: true
    },
  }).then((response) => {
    if (!response.ok) {
      return new Promise((resolve) => resolve([]));
    }
    return response.json().then((jsonResponse) => {
      return jsonResponse;
    });
  });
};

Data.checkifLoggedIn = async (username, password, email) => {
  const url = `${baseUrl}/users`;

  return await fetch(url).then((response) => {
    if (!response.ok) {
      return new Promise((resolve) => resolve([]));
    }
    return response.json().then((jsonResponse) => {
      console.log(jsonResponse)
      return jsonResponse;
    });
  });
};

Data.getTest = () => {
  let url  = `${baseUrl}/testing`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve([]));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.test
    });
  });
};





export default Data;