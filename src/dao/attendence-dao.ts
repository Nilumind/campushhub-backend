import mongoose, { set } from "mongoose";
import { IAttendenceAttributes, IAttendenceModel, IAttendence  } from "../models/attendence-model";
import Attendence from "../schemas/attendence-schema";
import Schedule from "../schemas/schedule-schema";

export default class AttendenceDAO {

    //Create Attendence

    static async createAttendence(attendenceData: IAttendenceAttributes){
        try {
            const attendence = new Attendence(attendenceData);
            return await attendence.save();
        } catch{
            throw new Error("Error creating Attendence");
        }
    }

    //Get Attedencby Schedule_id

    static async getAttendenceByScheduleId(schedule_id: string){
        try {
            return await Attendence.find({schedule_id: schedule_id});
        } catch{
            throw new Error("Error fetching Attendence");
        }
    }

    //Get Attendence by ID

    static async getAttendenceById(id: string){
        try {
            const attendencebyid =  await Attendence.findById(id);

            if(!attendencebyid){
                return { message :  "Attendence not found"};
            }
            return attendencebyid;

        } catch{
            throw new Error("Error Fetching Attendence");
        }

    }

    //get attendence by user_id

    static async getAttendenceByUserId(user_id: string){
        try {
            const attendencebyuserid = await Attendence.find({user_id: user_id});

            if(!attendencebyuserid){
                return { message :  "Attendence not found"};
            }

            return attendencebyuserid;
        } catch{
            throw new Error("Error Fetching Attendence");
        }
    }

    //cancel atterence

    static async cancelAttendence(id: string){
        try {
            const attendence = await Attendence.findByIdAndUpdate(id, {status: 0}, {new: true});

            if(!attendence){
                throw new Error("Attendence not found");
            }
            return attendence;
        } catch{
            throw new Error("Error Cancelling Attendence");
        }
    }

    //re attendence
    static async reAttendence(id: string){
        try {
            const attendence = await Attendence.findByIdAndUpdate(id, {status: 1}, {new: true});

            if(!attendence){
                throw new Error("Attendence not found");
            }

            return attendence;
        } catch{
            throw new Error("Error Re-Attending Attendence");
        }
    }

    //check attendence 
    static async checkAttendence( schedule_id: string, user_id: string) {
        try {
            
            const checkSchedule = await Schedule.findById(schedule_id);
    
            
            if (!checkSchedule) {
                return {
                    success: false,
                    message: "Invalid schedule. The selected schedule does not exist.",
                };
            }
    
            
            const attendance = await Attendence.find({ user_id: user_id });
    
            if (attendance.length === 0) {
                return {
                    success: true,
                    message: "You can attend this schedule",
                };
            }
    
            // Extract schedule IDs from attendance records
            const scheduleIds = attendance.map(att => att.schedule_id);
    
            // Fetch schedules based on extracted schedule IDs
            const schedules = await Schedule.find({ _id: { $in: scheduleIds } });
    
            // Check if any existing schedule conflicts with the new one
            const conflict = schedules.some(schedule => 
                schedule.date === checkSchedule.date && schedule.time_slot === checkSchedule.time_slot
            );
    
            if (conflict) {
                return {
                    success: false,
                    message: "You already have a schedule for this date and time slot.",
                };
            }
    
            return {
                success: true,
                message: "You can attend this schedule",
            };
    
        } catch (error) {
            throw new Error("Error checking attendance: ");
        }
    }
    

}