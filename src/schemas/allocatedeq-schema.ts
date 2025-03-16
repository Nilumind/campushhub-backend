import mongoose, { Schema, SchemaOptions } from "mongoose";
import {IAllocatedeqAttributes, IAllocatedeqModel } from "../models/allocatedeq-model";

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: { virtuals: true },
};

const AllocatedeqSchema = new Schema<IAllocatedeqAttributes, IAllocatedeqModel>({

    schedule_id: { type: String, required: false },
    equipment_id: { type: String, required: false },
    av_quantity: { type: Number, required: true },
    date : {type: String, required:false},
    time_slot: { type: String, required: false },
    status: { type: Number, required: false, default: 1 },
    isActive: { type: Number, default: 1 },

}, { timestamps: true });

const Allocatedeq = mongoose.model<IAllocatedeqAttributes, IAllocatedeqModel>("Allocatedeq", AllocatedeqSchema);
export default Allocatedeq;