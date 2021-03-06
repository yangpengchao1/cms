import {BaseResponse} from "../Entity/response/BaseResponse";
import BaseAPI from "./BaseAPI";
import {GetStudentsRequest} from "../Entity/request/GetStudentsRequest";
import {GetStudentsResponse} from "../Entity/response/GetStudentsResponse";
import {AddStudentRequest} from "../Entity/request/AddStudentRequest";
import {AddStudentResponse} from "../Entity/response/AddStudentResponse";
import {DeleteStudentRequest} from "../Entity/request/DeleteStudentRequest";
import {GetStudentRequest} from "../Entity/request/GetStudentRequest";
import {UpdateStudentRequest} from "../Entity/request/UpdateStudentRequest";
import {UpdateStudentResponse} from "../Entity/response/UpdateStudentResponse";
import {Student} from "../Entity/Student";

class StudentAPI extends BaseAPI {
    public getStudentList(req: GetStudentsRequest): Promise<BaseResponse<GetStudentsResponse>> {
        return this.createGet(req);
    }

    public addStudent(req: AddStudentRequest): Promise<BaseResponse<AddStudentResponse>> {
        return this.createPost(req);
    }

    public deleteStudent(req: DeleteStudentRequest): Promise<BaseResponse<boolean>> {
        return this.createDelete(req);
    }

    public getStudent(req: GetStudentRequest): Promise<BaseResponse<Student>> {
        return this.createGet(req);
    }

    public updateStudent(req: UpdateStudentRequest): Promise<BaseResponse<UpdateStudentResponse>> {
        return this.createPut(req);
    }
}

export const studentAPI = new StudentAPI();
