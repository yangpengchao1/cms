import {DeleteStudentRequest} from "./DeleteStudentRequest";

export class GetStudentRequest extends DeleteStudentRequest {

    constructor(id: string | string[] | undefined) {
        super(id);
    }
}