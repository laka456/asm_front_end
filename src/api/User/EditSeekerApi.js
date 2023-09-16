export default async function EditSeekerApi(
    id,
    name,
    address,
    gender,
    phone,
    country,
    job_type,
    email,e,


) {
    let res = "";
    try {
        const body = {
            id:id,
            name: name,
            address: address,
            gender: gender,
            phone: phone,
            country: country,
            job_type: job_type,
            email: email,

        };
        // const token = "Bearer " + localStorage.getItem("authToken");
        const token = "Bearer " +"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwNTQ3ODAyOTUsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiQURNSU4iXSwianRpIjoiYjE4MGQ0YWItYzNhZC00OGUzLThkMTktMmI3MjYzNzc2MTZhIiwiY2xpZW50X2lkIjoiYXNtIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXX0.dRI9ssOdYqldMdLkLfCaPQDi7nWGEyhCJMsaZhACWsI";
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: token,
            },
            body: JSON.stringify(body),
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

                res = error;
            });
    } catch (error) {
        console.error(error);
        res = error;
    }

    return res;
}
