import axios from "axios";

export default axios.create({
    baseURL: "http://35.209.23.81/v1",
    headers: {
        "Content-type": "application/json"
    }
});

export const apiV1 = () => {
    let data = JSON.parse(localStorage.getItem("_u"))
    return axios.create({
        baseURL: "http://35.209.23.81/v1",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${data?.token}`
        }
    })
}
