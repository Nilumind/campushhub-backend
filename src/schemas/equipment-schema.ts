import mongoose, { Schema, SchemaOptions } from "mongoose";
import {IEquipmentAttributes, IEquipmentModel } from "../models/equipment-model";

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: { virtuals: true },
};

const EquipmentSchema = new Schema<IEquipmentAttributes, IEquipmentModel>({

    eq_name: { type: String, required: true },
    eq_type: { type: String, required: false },
    quantity: { type: Number, required: true },
    available: { type: Number, required: true },
    isActive: { type: Number, default: 1 },

}, { timestamps: true });

const Equipment = mongoose.model<IEquipmentAttributes, IEquipmentModel>("Equipment", EquipmentSchema);
export default Equipment;