export default async function EditUserApi(
    id,
    firstName,
    lastName,
    imageUrl,
) {

  let res = "";
  try {
    const body = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      imageUrl: imageUrl
    };
    const token = "Bearer " + localStorage.getItem("authToken");
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    };
    await fetch(
        `${process.env.REACT_APP_API_URL}v1/user/edit-user`,
        requestOptions
    )
        .then((response) => response.json())
        .then((response) => {
          res = response;
        })
        .catch((error) => {
          console.error("Error editing user: ", error);
          res = error;
        });
  } catch (error) {
    console.error(error);
    res = error;
  }

  return res;
};
