import {BaseResponse} from "../Entity/response/BaseResponse";
import BaseAPI from "./BaseAPI";
import {AxiosResponse} from "axios";
import {GetStudentsRequest} from "../Entity/request/GetStudentsRequest";
import {GetStudentsResponse} from "../Entity/response/GetStudentsResponse";
import {AddStudentRequest} from "../Entity/request/AddStudentRequest";
import {AddStudentResponse, LoginResponse} from "../Entity/response/AddStudentResponse";
import {DeleteStudentRequest} from "../Entity/request/DeleteStudentRequest";
import {GetStudentRequest} from "../Entity/request/GetStudentRequest";
import {GetStudentResponse} from "../Entity/response/GetStudentResponse";
import {UpdateStudentRequest} from "../Entity/request/UpdateStudentRequest";
import {UpdateStudentResponse} from "../Entity/response/UpdateStudentResponse";

class StudentAPI extends BaseAPI {
    public getStudentList(req: GetStudentsRequest): Promise<AxiosResponse<BaseResponse<GetStudentsResponse>>> {
        return this.createGet(req);
    }

    public addStudent(req: AddStudentRequest): Promise<AxiosResponse<BaseResponse<AddStudentResponse>>> {
        return this.createPost(req);
    }

    public deleteStudent(req: DeleteStudentRequest): Promise<AxiosResponse<BaseResponse<boolean>>> {
        return this.createDelete(req);
    }

    public getStudent(req: GetStudentRequest): Promise<AxiosResponse<BaseResponse<GetStudentResponse>>> {
        return this.createGet(req);
    }

    public updateStudent(req: UpdateStudentRequest): Promise<AxiosResponse<BaseResponse<UpdateStudentResponse>>> {
        return this.createPut(req);
    }
}

export const studentAPI = new StudentAPI();
