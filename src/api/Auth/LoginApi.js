export default async function LoginApi(username, password) {
    let res = "";
    try {
      const body = {
        username: username,
        password: password,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(body),
      };
      await fetch(`${process.env.REACT_APP_API_URL}v1/auth/login`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          res = response;
        })
        .catch((error) => {
          console.error("Error Login: ", error);
          res = error;
        });
    } catch (error) {
      console.error(error);
      res = error;
    }
  
    return res;
  }
  