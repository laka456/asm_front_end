export async function GetConsultantApi() {
  let res = "";
  try {
    const token = "Bearer " + localStorage.getItem("authToken");
    // const token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwNTQ3NzY4ODIsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiQ09OU1VMVEFOVCJdLCJqdGkiOiIzMWQ2NDk3Yi01Y2Y3LTQzMWMtYTE0MS1iMTczZTZiZGFmZWUiLCJjbGllbnRfaWQiOiJhc20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiLCJ0cnVzdCJdfQ.3W0ypxNUZ28OKRrI4x3VqnOSWyQ1T35UHY9sBx1JCv4";

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: token,
      },
    };
    await fetch(`http://localhost:8080/consultant`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        res = response;
      })
      .catch((error) => {
        console.error("Error get Consultant: ", error);
        res = error;
      });
  } catch (error) {
    console.error(error);
    res = error;
  }

  return res;
}
