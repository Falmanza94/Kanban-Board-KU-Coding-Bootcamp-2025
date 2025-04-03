import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route

  //this try block sends a login request to the server as a JSON and waits and handles any type of error
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    //if the response from the server is not succesful then the error details are extracted and a new reponse error is generated
    if(!response.ok) {
      const errorData = await response.json();
      console.log('Login error:', errorData);
      throw new Error(`Error: ${errorData.message}`);
    }
    const data = await response.json();
    console.log('Login successful', data);
    return data;
  } catch (err) {
    console.log ('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
}

export { login };
