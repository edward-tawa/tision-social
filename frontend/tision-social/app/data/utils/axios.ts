import axios from "axios";
import getCsrfToken from "@/app/data/utils/getCsrfToken";


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    //timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true,

})


api.interceptors.request.use(config => {
    // Add any request interceptors here if needed
    const csrfToken = getCsrfToken();
    if (csrfToken && ["post", "patch", "put", "delete"].includes(config.method?.toLocaleLowerCase() || "")) {
        config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
})

export default api;