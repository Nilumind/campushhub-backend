import mongoose, { Schema, Document } from 'mongoose';


export enum LectureHall {
    LECTURE_HALL_1 = 'lecture-hall-1',
    LECTURE_HALL_2 = 'lecture-hall-2',
    LECTURE_HALL_3 = 'lecture-hall-3',
    LECTURE_HALL_4 = 'lecture-hall-4',
    LECTURE_HALL_5 = 'lecture-hall-5',
}

export enum Auditorium {
    AUDITORIUM_1 = 'auditorium-1',
    AUDITORIUM_2 = 'auditorium-2',
}

export type FacilityType = "LectureHall" | "Auditorium";

// Interface for the reservation document
export interface IReservationAttributes extends Document {
    facilityType: FacilityType;
    facilityName: LectureHall | Auditorium;
    capacity: number;
    requestedBy: string;
    purpose: string;
    startTime: Date;
    endTime: Date;
    status: 'pending' | 'approved' | 'rejected';
    department: string;
    additionalRequirements?: string;
    createdAt: Date;
    updatedAt: Date;
}


export type IReservation = IReservationAttributes;
export type IReservationModel = mongoose.Model<IReservationAttributes>;