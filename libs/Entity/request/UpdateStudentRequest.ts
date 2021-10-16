import {AddStudentRequest} from "./AddStudentRequest";

export class UpdateStudentRequest extends AddStudentRequest {

    private "_id": number|string;

    convertToJsonString(): string {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            country: this.country,
            type: this.type,
            email: this.email,
        });
    }

    constructor(name: string, country: string, email: string, type: number, id: number | string) {
        super(name, country, email, type);
        this._id = id;
    }

    get id(): number | string {
        return this._id;
    }

    set id(value: number | string) {
        this._id = value;
    }
}