import {BaseRequest} from "./BaseRequest";
import {API_HOST} from "../../constant/Config";
import {RequestURL} from "../../enum/RequestURL";

export class GetCourseDetailRequest extends BaseRequest {

    private _id: number;

    convertToJsonString(): string {
        return "";
    }

    needToken(): boolean {
        return true;
    }

    requestURL(): string {
        return API_HOST + RequestURL.COURSE_DETAIL+`?id=`+this.id;
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