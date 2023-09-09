export default async function EditConsultantNameApi(id, name) {
  let res = "";
  try {
    const body = {
      id: id,
      name: name,
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
      `${process.env.REACT_APP_API_URL}v1/Consultant/edit-name`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        res = response;
      })
      .catch((error) => {
        console.error("Error editing Consultant name: ", error);
        res = error;
      });
  } catch (error) {
    console.error(error);
    res = error;
  }

  return res;
}
