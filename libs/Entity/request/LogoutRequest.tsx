import {BaseRequest} from "./BaseRequest";
import {API_HOST} from "../../constant/Config";
import {RequestURL} from "../../enum/RequestURL";

export class LogoutRequest extends BaseRequest {

    public convertToJsonString(): string {
        return JSON.stringify({});
    }

    constructor() {
        super();
    }

    needToken(): boolean {
        return true;
    }

    requestURL(): string {
        return API_HOST + RequestURL.LOGOUT;
    }
}