import mongoose, { Schema, SchemaOptions } from "mongoose";
import { IReservationAttributes, IReservationModel } from "../models/reservation-model";

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: { virtuals: true },
};

const ReservationSchema = new Schema<IReservationAttributes, IReservationModel>({
    facilityName: { type: String, required: true },
    capacity: { type: Number, required: true },
    requestedBy: { type: String, required: true },
    scheduleType: { type: String, required: true },
    scheduleName: { type: String, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: false },
    date: { type: Date, required: true },
}, { timestamps: true });

const Reservation = mongoose.model<IReservationAttributes, IReservationModel>("Reservation", ReservationSchema);
export default Reservation;
