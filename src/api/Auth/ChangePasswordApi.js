export default async function ChangePasswordApi(
    currentPassword,
    newPassword,
    confirmPassword
  ) {
    let res = "";
    try {
      const body = {
        oldPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };
      const token = "Bearer " + localStorage.getItem("authToken");
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
        `${process.env.REACT_APP_API_URL}v1/auth/change-password`,
        requestOptions
      )
        .then((response) => response.json())
        .then((response) => {
          res = response;
        })
        .catch((error) => {
          console.error("Error change password: ", error);
          res = error;
        });
    } catch (error) {
      console.error(error);
      res = error;
    }
  
    return res;
  }
  