import {BaseResponse} from "../Entity/response/BaseResponse";
import BaseAPI from "./BaseAPI";
import {AxiosResponse} from "axios";
import {GetCoursesRequest} from "../Entity/request/GetCoursesRequest";
import {GetCoursesResponse} from "../Entity/response/GetCoursesResponse";
import {GetCourseDetailRequest} from "../Entity/request/GetCourseDetailRequest";
import {Course} from "../Entity/Course";

class CourseAPI extends BaseAPI {
    public getCourseList(req: GetCoursesRequest): Promise<AxiosResponse<BaseResponse<GetCoursesResponse>>> {
        return this.createGet(req);
    }

    public getCourseDetail(req: GetCourseDetailRequest): Promise<AxiosResponse<BaseResponse<Course>>> {
        return this.createGet(req);
    }
}

export const courseAPI = new CourseAPI();
