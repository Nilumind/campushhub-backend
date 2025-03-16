import { HydratedDocument, Model, PopulatedDoc } from "mongoose";


export interface IAllocatedeqAttributes {
    schedule_id: string;
    equipment_id: string;
    av_quantity: number;
    date: string;
    time_slot: string;
    status: number;
    isActive: number;
}

export type IAllocatedeq = HydratedDocument<IAllocatedeqAttributes>;
export type IAllocatedeqModel = Model<IAllocatedeqAttributes>;