import axios from "axios";

export function createPost(baseURL: string, data: string) {
    return axios.post(baseURL, data,{
        headers: {"Content-type": "application/json"}
    });
}

export function createGet(baseURL: string) {
    return axios.get(baseURL);
}