import {BaseResponse} from "../Entity/response/BaseResponse";
import BaseAPI from "./BaseAPI";
import {AxiosResponse} from "axios";
import {GetCoursesRequest} from "../Entity/request/GetCoursesRequest";
import {GetCoursesResponse} from "../Entity/response/GetCoursesResponse";

class CourseAPI extends BaseAPI {
    public getCourseList(req: GetCoursesRequest): Promise<AxiosResponse<BaseResponse<GetCoursesResponse>>> {
        return this.createGet(req);
    }
}

export const courseAPI = new CourseAPI();
