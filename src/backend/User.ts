import { database } from "./config";
import { push, ref, set } from "firebase/database";
const pathUser = "/users/";
export interface User {
    userId: string;
    Name: string;
    gender: string;
    phoneNumber: string;
    countUser? : number;
}
