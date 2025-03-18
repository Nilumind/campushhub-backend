import mongoose, { Schema, Document } from 'mongoose';


export enum facilityName {
    LECTURE_HALL_1 = 'lecture-hall-1',
    LECTURE_HALL_2 = 'lecture-hall-2',
    LECTURE_HALL_3 = 'lecture-hall-3',
    LECTURE_HALL_4 = 'lecture-hall-4',
    LECTURE_HALL_5 = 'lecture-hall-5',
    AUDITORIUM_1 = 'auditorium-1',
    AUDITORIUM_2 = 'auditorium-2',
}

// Interface for the reservation document
export interface IReservationAttributes {
    facilityName: facilityName;
    capacity: number;
    equipmentId?: string;
    equipmentQuantity?: number;
    requestedBy: string;
    scheduleType: string;
    scheduleName: string;
    date: Date;
    timeSlot: string;
    status: 'pending' | 'approved' | 'rejected';
    description?: string;
}


export type IReservation = IReservationAttributes;
export type IReservationModel = mongoose.Model<IReservationAttributes>;