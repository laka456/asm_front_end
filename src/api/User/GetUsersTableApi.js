export default async function GetUsersTableApi() {
  let res = "";
  try {
    // const token = "Bearer " + localStorage.getItem("authToken");
    const token = "Bearer " +"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwNTQ3ODAyOTUsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiQURNSU4iXSwianRpIjoiYjE4MGQ0YWItYzNhZC00OGUzLThkMTktMmI3MjYzNzc2MTZhIiwiY2xpZW50X2lkIjoiYXNtIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXX0.dRI9ssOdYqldMdLkLfCaPQDi7nWGEyhCJMsaZhACWsI";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: token,
      },
    };
    await fetch(
        `http://localhost:8080/user`,
        requestOptions
    )
        .then((response) => response.json())
        .then((response) => {
          res = response;
        })
        .catch((error) => {
          console.error("Error get  table: ", error);
          res = error;
        });
  } catch (error) {
    console.error(error);
    res = error;
  }

  return res;
}
