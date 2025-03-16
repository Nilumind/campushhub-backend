import mongoose, { Schema, SchemaOptions } from "mongoose";
import {IScheduleAttributes, IScheduleModel } from "../models/schedule-model";

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: { virtuals: true },
};

const ScheduleSchema = new Schema<IScheduleAttributes, IScheduleModel>({

    shedule_name: { type: String, required: true },
    shedule_type: { type: String, required: false },
    date: { type: String, required: true },
    time_slot: { type: String, required: true },
    isActive: { type: Number, default: 1 },
    status: { type: Number, required: false, default: 1 },
    place: { type: String, required: true },
    capacity: { type: Number, required: false, default: 0 },
    description: { type: String, required: true },
    reservation_id : { type: String, required: false, default: null },
}, { timestamps: true });

const Schedule = mongoose.model<IScheduleAttributes, IScheduleModel>("Schedule", ScheduleSchema);
export default Schedule;