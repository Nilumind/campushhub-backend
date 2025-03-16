import { HydratedDocument, Model, PopulatedDoc } from "mongoose";


export interface IScheduleAttributes {
    shedule_name: string;
    shedule_type: string;
    date : string;
    time_slot: string;
    status: Number;
    place: string;
    capacity: Number;
    description: string;
    reservation_id?: string;
    isActive: number;
}

export type ISchedule = HydratedDocument<IScheduleAttributes>;
export type IScheduleModel = Model<IScheduleAttributes>;