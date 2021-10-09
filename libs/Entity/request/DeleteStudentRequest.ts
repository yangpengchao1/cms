import {BaseRequest} from "./BaseRequest";
import {API_HOST} from "../../constant/Config";
import {RequestURL} from "../../enum/RequestURL";

export class DeleteStudentRequest extends BaseRequest {

    private "_id": number;

    convertToJsonString(): string {
        return JSON.stringify({});
    }

    needToken(): boolean {
        return true;
    }

    requestURL(): string {
        return API_HOST + RequestURL.STUDENT_LIST + `/` + this.id;
    }

    constructor(id: number) {
        super();
        this._id = id;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

}