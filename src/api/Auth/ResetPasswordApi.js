export default async function ResetPasswordApi(
    newPassword,
    confirmPassword,
    newToken
  ) {
    let res = "";
    try {
      const body = {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };
      const token = "Bearer " + newToken;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
      };
  
      await fetch(
        `${process.env.REACT_APP_API_URL}v1/auth/reset-Password`,
        requestOptions
      )
        .then((response) => response.json())
        .then((response) => {
          res = response;
        })
        .catch((error) => {
          console.error("Error: error reset password", error);
          res = error;
        });
    } catch (error) {
      console.error(error);
      res = error;
    }
  
    return res;
  }
  