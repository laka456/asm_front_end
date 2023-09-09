export default async function GetConsultantTableApi(page, businessId) {
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
      }v1/category/category-table?page=${page}&limit=${10}&businessId=${businessId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        res = response;
      })
      .catch((error) => {
        console.error("Error get Consultant table: ", error);
        res = error;
      });
  } catch (error) {
    console.error(error);
    res = error;
  }

  return res;
}
