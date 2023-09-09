export default async function AddConsultantApi(
    job_type,
    country,
    name,
    username,
    password,
    role

  ) {
    let res = "";
    try {
      const body = {
        job_type: job_type,
        country: country,
        user:{
          name: name,
          username: username,
          password: password,
          role: role,
        }


      };
      // const token = "Bearer " + localStorage.getItem("authToken");
      const token = "Bearer " +"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1ODcyODAsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiQ09OU1VMVEFOVCJdLCJqdGkiOiI1NGJmYTNkYS1lMzExLTQ5ZDctYmZjOS04Mzc2NDI2MGU1ZmYiLCJjbGllbnRfaWQiOiJhc20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiLCJ0cnVzdCJdfQ.olUDZ6rkROYXVYej74LFtn8bOqtkD7cK5EIFbeZ50ZM";
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
      };
      await fetch(`http://localhost:8080/consultant`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          res = response;
        })
        .catch((error) => {
          console.error("Error add Consultant: ", error);
          res = error;
        });
    } catch (error) {
      console.error(error);
      res = error;
    }
  
    return res;
  }
  