import axios, {AxiosError, AxiosResponse} from "axios";
import {BaseResponse} from "../Entity/response/BaseResponse";
import {BaseRequest} from "../Entity/request/BaseRequest";
import {message} from "antd";

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

    protected createPut(baseRequest: BaseRequest): Promise<AxiosResponse<BaseResponse<any>>> {
        const data = baseRequest.convertToJsonString();
        return axios.put(baseRequest.requestURL(), data, this.getHeaders(baseRequest.needToken()));
    }

    /**
     * 显示 Api 上的提示信息
     */
    protected showMessage = (isSuccessDisplay = false) =>
        (res: AxiosResponse<BaseResponse<any>>): AxiosResponse<BaseResponse<any>> => {
            const {code, msg} = res.data;
            const isError = this.isError(code);

            if (isError) {
                message.error(msg);
            }

            if (isSuccessDisplay && !isError) {
                message.success(msg);
            }

            return res;
        };

    /**
     * 根据 HTTP 状态码判断请求是否成功
     */
    protected isError(code: number): boolean {
        return !(code.toString().startsWith('2') || code.toString().startsWith('3'));
    }

    /**
     * 处理 http 请求上的错误
     * 注意：此处返回的code是HTTP的状态码，并非后台自定义的code
     */
    protected errorHandler(err: AxiosError<BaseResponse>): BaseResponse {
        const msg = err.response?.data.msg ?? 'unknown error';
        const code = err.response?.status ?? -1;

        if (!err.response) {
            console.error('%c [ err ]-149', 'font-size:13px; background:pink; color:#bf2c9f;', err);
        }

        return {msg, code};
    }
}