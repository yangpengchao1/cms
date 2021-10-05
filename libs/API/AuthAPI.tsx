import axios from "axios";

export function createPost(baseURL: string, data: string) {
    const token = localStorage.getItem("token");
    return axios.post(baseURL, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
}

export function createGet(baseURL: string) {
    const token = localStorage.getItem("token");
    return axios.get(baseURL, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
}