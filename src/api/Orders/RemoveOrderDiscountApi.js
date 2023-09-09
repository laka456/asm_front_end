export default async function RemoveOrderDiscountApi(id) {
  let res = "";
  try {
    const body = {
      id: id,
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
      `${process.env.REACT_APP_API_URL}v1/order/remove-discount`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        res = response;
      })
      .catch((error) => {
        console.error("Error remove order discount: ", error);
        res = error;
      });
  } catch (error) {
    console.error(error);
    res = error;
  }

  return res;
}
