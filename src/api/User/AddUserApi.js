export default async function AddUserApi(
    name,

    username,
    password,
    role,

) {
    let res = "";
    try {
        const body = {
            name: name,
            username: username,
            password: password,
            role: role,


        };
        // const token = "Bearer " + localStorage.getItem("authToken");
        const token = "Bearer " +"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwNTQ3ODAyOTUsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiQURNSU4iXSwianRpIjoiYjE4MGQ0YWItYzNhZC00OGUzLThkMTktMmI3MjYzNzc2MTZhIiwiY2xpZW50X2lkIjoiYXNtIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXX0.dRI9ssOdYqldMdLkLfCaPQDi7nWGEyhCJMsaZhACWsI";
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: token,
            },
            body: JSON.stringify(body),
        };
        await fetch(`http://localhost:8080/user`, requestOptions)
            .then((response) => response.json())
            .then((response) => {
                res = response;
            })
            .catch((error) => {
                console.error("Error add menu-item: ", error);
                res = error;
            });
    } catch (error) {
        console.error(error);
        res = error;
    }

    return res;
}
