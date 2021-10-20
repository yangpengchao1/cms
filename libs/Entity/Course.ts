import {Type} from "./Type";

export interface Course {
    id: number;
    courseId: number;
    name: string;
    courseDate:Date;
    studentId:number;
    createdAt:Date;
    updatedAt:Date;
    type:Type[];
}