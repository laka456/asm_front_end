export default async function GetOrderItemMoreInfoApi(id, menuItemId) {
  let res = "";
  try {
    const token = "Bearer " + localStorage.getItem("authToken");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: token,
      },
    };
    await fetch(
      `${process.env.REACT_APP_API_URL}v1/order/more-info-item/${id}?menuItemId=${menuItemId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        res = response;
      })
      .catch((error) => {
        console.error("Error order item more info: ", error);
        res = error;
      });
  } catch (error) {
    console.error(error);
    res = error;
  }

  return res;
}
