import {Paginator} from "../Paginator";
import {Student} from "../Student";

export interface GetStudentsResponse {
    total: number;
    students: Student[];
    paginator: Paginator
}