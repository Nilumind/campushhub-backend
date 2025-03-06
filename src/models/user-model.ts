import { HydratedDocument, Model, PopulatedDoc } from "mongoose";

export enum UserRole {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
    LECTURER = "LECTURER",
    ADMINISTRATOR = "ADMINISTRATOR",
    USER = "USER",
}

export interface IUserAttributes {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    universityId?: string;  // Unique identifier for students/staff
    phoneNumber?: string;
    department?: string;
    profilePicture?: string;
    isActive?: boolean;
    isEmailVerified?: boolean;
    accountStatus?: "PENDING" | "ACTIVE" | "SUSPENDED";
}

export type IUser = HydratedDocument<IUserAttributes>;
export type IUserModel = Model<IUserAttributes>;
