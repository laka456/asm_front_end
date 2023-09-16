export default async function DeleteSeekersApi(id) {
    let res = "";
    try {
      const body = {
        id: id,
      };
      // const token = "Bearer " + localStorage.getItem("authToken");
        const token = "Bearer " +"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwNTQ3ODAyOTUsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiQURNSU4iXSwianRpIjoiYjE4MGQ0YWItYzNhZC00OGUzLThkMTktMmI3MjYzNzc2MTZhIiwiY2xpZW50X2lkIjoiYXNtIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXX0.dRI9ssOdYqldMdLkLfCaPQDi7nWGEyhCJMsaZhACWsI";
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
      };
      await fetch(
        `http://localhost:8080/seeker/${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((response) => {
          res = response;
        })
        .catch((error) => {
          console.error("Error delete : ", error);
          res = error;
        });
    } catch (error) {
      console.error(error);
      res = error;
    }
  
    return res;
  }
  