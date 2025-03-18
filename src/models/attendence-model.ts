import { HydratedDocument, Model, PopulatedDoc } from "mongoose";


export interface IAttendenceAttributes {
    schedule_id: string;
    user_id : string;
    status: number;
    isActive: number;
}

export type IAttendence = HydratedDocument<IAttendenceAttributes>;
export type IAttendenceModel = Model<IAttendenceAttributes>;