import mongoose, { Schema, Document } from 'mongoose';


export enum facilityName {
    LECTURE_HALL_1 = 'Lecture Hall 1',
    LECTURE_HALL_2 = 'Lecture Hall 2',
    LECTURE_HALL_3 = 'Lecture Hall 3',
    LECTURE_HALL_4 = 'Lecture Hall 4',
    LECTURE_HALL_5 = 'Lecture Hall 6',
    AUDITORIUM_1 = 'Auditorium 1',
    AUDITORIUM_2 = 'Auditorium 2',
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