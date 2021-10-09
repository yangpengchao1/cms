import axios, {AxiosResponse} from "axios";
import {BaseResponse} from "../Entity/response/BaseResponse";
import {BaseRequest} from "../Entity/request/BaseRequest";

export default class BaseAPI {

    private getHeaders(needToken: boolean): Object {
        let headers;
        if (needToken) {
            const token = localStorage.getItem("token");
            headers = {
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            };
        } else {
            headers = {
                headers: {
                    "Content-type": "application/json",
                }
            };
        }
        return headers;
    }

    protected createPost(baseRequest: BaseRequest): Promise<AxiosResponse<BaseResponse<any>>> {
        let data = baseRequest.convertToJsonString();
        if (data === "") {
            data = "{}";
        }
        return axios.post(baseRequest.requestURL(), data, this.getHeaders(baseRequest.needToken()));
    }

    protected createGet(baseRequest: BaseRequest): Promise<AxiosResponse<BaseResponse<any>>> {
        return axios.get(baseRequest.requestURL(), this.getHeaders(baseRequest.needToken()));
    }

    protected createDelete(baseRequest: BaseRequest): Promise<AxiosResponse<BaseResponse<any>>> {
        return axios.delete(baseRequest.requestURL(), this.getHeaders(baseRequest.needToken()));
    }
}