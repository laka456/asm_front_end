export default async function EditPreferencesApi(
  id,
  logo,
  currency,
  tax,
  serviceCharge
) {
  let res = "";
  try {
    const body = {
      id: id,
      logo: logo,
      currency: currency,
      tax: tax,
      serviceCharge: serviceCharge,
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
      `${process.env.REACT_APP_API_URL}v1/business/edit-preference`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        res = response;
      })
      .catch((error) => {
        console.error("Error editing preferences: ", error);
        res = error;
      });
  } catch (error) {
    console.error(error);
    res = error;
  }

  return res;
}
