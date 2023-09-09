export default async function EditBusinessApi(
  id,
  name,
  address,
  phoneNumber,
  profile,
  coverPhoto,
  description,
  siteUrl
) {
  let res = "";
  try {
    const body = {
      id: id,
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      profile: profile,
      coverPhoto: coverPhoto,
      description: description,
      siteUrl: siteUrl,
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
      `${process.env.REACT_APP_API_URL}v1/business/edit`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        res = response;
      })
      .catch((error) => {
        console.error("Error editing business: ", error);
        res = error;
      });
  } catch (error) {
    console.error(error);
    res = error;
  }

  return res;
}
