import {Type} from "./Type";
import {Schedule} from "./Schedule";
import {Sale} from "./Sale";

export interface Course {
    id: number;
    courseId: number;
    name: string;
    courseDate:Date;
    studentId:number;
    createdAt:Date;
    updatedAt:Date;
    type:Type[];
    cover:string;
    detail:string;
    duration:number;
    durationUnit:number;
    maxStudents:number;
    price:string;
    uid:string;
    star:number;
    startTime:Date;
    status:number;
    scheduleId:number;
    teacherId:number;
    teacherName:string;
    schedule:Schedule;
    sales:Sale;
}