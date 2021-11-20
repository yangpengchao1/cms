import {Paginator} from "../Paginator";
import {Course} from "../Course";

export interface GetCoursesResponse {
    total: number;
    courses: Course[];
    paginator: Paginator
}