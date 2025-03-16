import mongoose from "mongoose";
import { IReservationAttributes, IReservationModel, IReservation } from "../models/reservation-model";
import Reservation from "../schemas/reservation-schema";


export default class ReservationDAO {
    static async addReservation(reservation: IReservationAttributes): Promise<IReservation> {
        try {
            const newReservation = new Reservation(reservation);
            return await newReservation.save();
        } catch (error: any) {
            throw new Error('Failed to create reservation: ' + error.message);
        }
    }

    static async getReservations(): Promise<IReservation[]> {
        try {
            const reservations = await Reservation.find();
            if (!reservations) {
                throw new Error('No reservations found');
            }
            return reservations;
        } catch (error: any) {
            throw new Error('Failed to fetch reservations: ' + error.message);
        }
    }

    static async getReservationById(id: string): Promise<IReservation | null> {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid reservation ID');
            }
            const reservation = await Reservation.findById(id);
            if (!reservation) {
                throw new Error('Reservation not found');
            }
            return reservation;
        } catch (error: any) {
            throw new Error('Failed to fetch reservation: ' + error.message);
        }
    }

    static async updateReservation(id: string, reservation: IReservationAttributes): Promise<IReservation | null> {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid reservation ID');
            }
            const updatedReservation = await Reservation.findByIdAndUpdate(id, reservation, { new: true });
            if (!updatedReservation) {
                throw new Error('Reservation not found');
            }
            return updatedReservation;
        } catch (error: any) {
            throw new Error('Failed to update reservation: ' + error.message);
        }
    }

    static async deleteReservation(id: string): Promise<IReservation | null> {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid reservation ID');
            }
            const deletedReservation = await Reservation.findByIdAndDelete(id);
            if (!deletedReservation) {
                throw new Error('Reservation not found');
            }
            return deletedReservation;
        } catch (error: any) {
            throw new Error('Failed to delete reservation: ' + error.message);
        }
    }
}