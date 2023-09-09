export default async function GetFilteredOrdersTableApi(
  tableNo,
  startDate,
  endDate,
  startPrice,
  endPrice,
  status,
  page
) {
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
      `${
        process.env.REACT_APP_API_URL
      }v1/order/filter?tableNo=${tableNo}&startDate=${startDate}&endDate=${endDate}&startPrice=${startPrice}&endPrice=${endPrice}&status=${status}&page=${page}&limit=${10}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        res = response;
      })
      .catch((error) => {
        console.error("Error get filtered order table: ", error);
        res = error;
      });
  } catch (error) {
    console.error(error);
    res = error;
  }

  return res;
}
