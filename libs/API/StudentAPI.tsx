import {BaseResponse} from "../Entity/response/BaseResponse";
import BaseAPI from "./BaseAPI";
import {AxiosResponse} from "axios";
import {GetStudentsRequest} from "../Entity/request/GetStudentsRequest";
import {GetStudentsResponse} from "../Entity/response/GetStudentsResponse";
import {AddStudentRequest} from "../Entity/request/AddStudentRequest";
import {LoginResponse} from "../Entity/response/AddStudentResponse";

class StudentAPI extends BaseAPI {
    public getStudentList(req: GetStudentsRequest): Promise<AxiosResponse<BaseResponse<GetStudentsResponse>>> {
        return this.createGet(req);
    }

    public addStudent(req: AddStudentRequest): Promise<AxiosResponse<BaseResponse<LoginResponse>>> {
        return this.createPost(req);
    }

}

export const studentAPI = new StudentAPI();
