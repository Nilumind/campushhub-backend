import mongoose, { Schema, SchemaOptions } from "mongoose";
import {IAttendenceAttributes, IAttendenceModel } from "../models/attendence-model";

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: { virtuals: true },
};

const AttendenceSchema = new Schema<IAttendenceAttributes, IAttendenceModel>({

    schedule_id: { type: String, required: true },
    user_id: { type: String, required: false },
    status: { type: Number, required: false, default:1 },
    isActive: { type: Number, default: 1 },

}, { timestamps: true });

const Attendence = mongoose.model<IAttendenceAttributes, IAttendenceModel>("Attendence", AttendenceSchema);
export default Attendence;