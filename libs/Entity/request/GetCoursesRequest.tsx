import {BaseRequest} from "./BaseRequest";
import {API_HOST} from "../../constant/Config";
import {RequestURL} from "../../enum/RequestURL";

export class GetCoursesRequest extends BaseRequest {

    private _page: number;
    private _limit: number;
    private _name: string | undefined;
    private _type: string | undefined;
    private _uid: string | undefined;
    private _userId: number | undefined;

    public getRequestData(): string {
        return JSON.stringify({});
    }

    requestURL(): string {
        let url = API_HOST + RequestURL.COURSE_LIST + `?page=` + this.page + `&limit=` + this.limit;
        const name = this.name;
        const userId = this._userId;
        const type = this._type;
        const uid = this._uid;
        if (name !== undefined) {
            url = url + `&name=` + name;
        }
        if (userId != undefined) {
            url = url + `&userId=` + userId;
        }
        if (type != undefined) {
            url = url + `&type=` + type;
        }
        if (uid != undefined) {
            url = url + `&uid=` + uid;
        }
        return url;
    }

    needToken(): boolean {
        return true;
    }

    constructor(page: number, limit: number) {
        super();
        this._page = page;
        this._limit = limit;
    }

    get page(): number {
        return this._page;
    }

    set page(value: number) {
        this._page = value;
    }

    get limit(): number {
        return this._limit;
    }

    set limit(value: number) {
        this._limit = value;
    }

    get name(): string | undefined {
        return this._name;
    }

    set name(value: string | undefined) {
        this._name = value;
    }

    get type(): string | undefined {
        return this._type;
    }

    set type(value: string | undefined) {
        this._type = value;
    }

    get uid(): string | undefined {
        return this._uid;
    }

    set uid(value: string | undefined) {
        this._uid = value;
    }

    get userId(): number | undefined {
        return this._userId;
    }

    set userId(value: number | undefined) {
        this._userId = value;
    }
}