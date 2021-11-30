import {BaseRequest} from "./BaseRequest";
import {API_HOST} from "../../constant/Config";
import {RequestURL} from "../../enum/RequestURL";

export class GetStudentsRequest extends BaseRequest {

    private "_query"?: string | "";
    private "_userId"?: number | undefined;
    private "_page": number;
    private "_limit": number;

    public getRequestData(): string {
        return JSON.stringify({});
    }

    needToken(): boolean {
        return true;
    }

    requestURL(): string {
        let url = API_HOST + RequestURL.STUDENT_LIST + `?page=` + this.page + `&limit=` + this.limit;
        const query = this.query;
        const userId = this.userId;
        if (query !== "") {
            url = url + `&query=` + query;
        }
        if (userId != undefined) {
            url = url + `&userId=` + userId;
        }
        return url;
    }

    constructor(query: string, userId: any, page: number, limit: number) {
        super();
        this._query = query;
        this._userId = userId;
        this._page = page;
        this._limit = limit;
    }

    // @ts-ignore
    get query(): string | "" | undefined {
        return this._query;
    }

    set query(value: string | "") {
        this._query = value;
    }


    get userId(): number | undefined {
        return this._userId;
    }

    set userId(value: number | undefined) {
        this._userId = value;
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
}