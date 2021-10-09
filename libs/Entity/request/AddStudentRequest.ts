import {BaseRequest} from "./BaseRequest";
import {API_HOST} from "../../constant/Config";
import {RequestURL} from "../../enum/RequestURL";

export class AddStudentRequest extends BaseRequest {

    private "_name": string;
    private "_country": string;
    private "_email": string;
    private "_type": number;

    convertToJsonString(): string {
        return JSON.stringify({
            name: this.name,
            country: this.country,
            type: this.type,
            email: this.email,
        });
    }

    constructor(name: string, country: string, email: string, type: number) {
        super();
        this._name = name;
        this._country = country;
        this._email = email;
        this._type = type;
    }

    needToken(): boolean {
        return true;
    }

    requestURL(): string {
        return API_HOST + RequestURL.STUDENT_LIST;
    }


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get type(): number {
        return this._type;
    }

    set type(value: number) {
        this._type = value;
    }
}