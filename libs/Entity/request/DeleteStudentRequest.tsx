import {BaseRequest} from "./BaseRequest";
import {API_HOST} from "../../constant/Config";
import {RequestURL} from "../../enum/RequestURL";

export class DeleteStudentRequest extends BaseRequest {

    private "_id": string | string[] | undefined;

    getRequestData(): string {
        return JSON.stringify({});
    }

    needToken(): boolean {
        return true;
    }

    requestURL(): string {
        return API_HOST + RequestURL.STUDENT_LIST + `/` + this.id;
    }

    constructor(id: string | string[] | undefined) {
        super();
        this._id = id;
    }


    get id(): string | string[] | undefined {
        return this._id;
    }

    set id(value: string | string[] | undefined) {
        this._id = value;
    }
}