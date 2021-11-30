import {BaseRequest} from "./BaseRequest";
import {API_HOST} from "../../constant/Config";
import {RequestURL} from "../../enum/RequestURL";
import {AES} from "crypto-js";

export class LoginRequest extends BaseRequest {
    requestURL(): string {
        return API_HOST + RequestURL.LOGIN;
    }

    needToken(): boolean {
        return false;
    }

    public getRequestData(): string {
        return JSON.stringify({
            email: this.email,
            role: this.role,
            password: AES.encrypt(this.password, "cms").toString(),
        });
    }

    private "_email": string;
    private readonly "_password": string;
    private "_role": string;

    constructor(email: "string", password: "string", role: "manager") {
        super();
        this._email = email;
        this._password = password;
        this._role = role;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    get role(): string {
        return this._role;
    }

    set role(value: string) {
        this._role = value;
    }

}