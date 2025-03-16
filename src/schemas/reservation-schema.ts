import mongoose, { Schema, SchemaOptions } from "mongoose";
import { IReservationAttributes, IReservationModel } from "../models/reservation-model";

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: { virtuals: true },
};

const ReservationSchema = new Schema<IReservationAttributes, IReservationModel>({
    facilityType: { type: String, required: true },
    facilityName: { type: String, required: true },
    capacity: { type: Number, required: true },
    requestedBy: { type: String, required: true },
    purpose: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, required: true },
    department: { type: String, required: false },
    additionalRequirements: { type: String, required: false },
}, { timestamps: true });

const Reservation = mongoose.model<IReservationAttributes, IReservationModel>("Reservation", ReservationSchema);
export default Reservation;
