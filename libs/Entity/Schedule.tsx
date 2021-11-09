import {Chapter} from "./Chapter";

export interface Schedule {
    createdAt:Date;
    updatedAt:Date;
    id:number;
    status:number;
    current:number;
    classTime:string[];
    chapters:Chapter[];
}