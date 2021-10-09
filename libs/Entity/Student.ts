import {Course} from "./Course";
import {Type} from "./Type";

export interface Student {
    country: string;
    courses: Course;
    createdAt: Date;
    email: string;
    id: number;
    name: string;
    profileId: number;
    type: Type;
    updatedAt: Date;
}