export default async function GetSeekersTableApi() {
  let res = "";
  try {
    // const token = "Bearer " + localStorage.getItem("authToken");
    const token = "Bearer " +"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1ODcyODAsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiQ09OU1VMVEFOVCJdLCJqdGkiOiI1NGJmYTNkYS1lMzExLTQ5ZDctYmZjOS04Mzc2NDI2MGU1ZmYiLCJjbGllbnRfaWQiOiJhc20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiLCJ0cnVzdCJdfQ.olUDZ6rkROYXVYej74LFtn8bOqtkD7cK5EIFbeZ50ZM";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: token,
      },
    };
    await fetch(
        `http://localhost:8080/seeker`,
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
