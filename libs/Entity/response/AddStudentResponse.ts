import {Course} from "../Course";
import {Type} from "../Type";

export interface LoginResponse {
    country: string;
    courses: Course[];
    createdAt: string;
    email: string;
    id: number;
    name: string;
    profileId: string;
    type: Type;
    updatedAt: string;
}