import mongoose, { set } from "mongoose";
import { IScheduleAttributes, IScheduleModel, ISchedule  } from "../models/schedule-model";
import Schedule from "../schemas/schedule-schema";

export default class ScheduleDAO {

    //Create Schedule
    static async createSchedule(scheduleData: IScheduleAttributes){
        try {
            const schedule = new Schedule(scheduleData);
            return await schedule.save();
        } catch{

            throw new Error("Error creating Schedule");

            }
    }

    //Get All Schedules
    static async getAllSchedules(){
        try {
            return await Schedule.find();
        } catch{

            throw new Error("Error fetching all Schedules");

        }
    }


    //Get Schedule by ID
    static async getScheduleById(id: string){
        try {
            return await Schedule.findById(id);
        } catch{

            throw new Error("Error Fetching Schedule");

       }    
    }

    //Update Schedule
    static async updateSchedule(id: string, scheduleData: IScheduleAttributes){
        try {

            if(!mongoose.Types.ObjectId.isValid(id)){
                throw new Error("Invalid Schedule ID");
            }

            const updatedSchedule = await Schedule.findByIdAndUpdate(id, scheduleData, { new: true });

            if(!updatedSchedule){
                throw new Error("Schedule not found");
            }

            return updatedSchedule;


        }catch{

            throw new Error("Error updating Schedule");

       }
    } 

    //Delete Schedule
    static async deleteSchedule(id: string){
        try {

            if(!mongoose.Types.ObjectId.isValid(id)){
                throw new Error("Invalid Schedule ID");
            }

            const deletedSchedule = await Schedule.findByIdAndUpdate(
                id,
                { isActive: 0 },
                { new: true }
            );

            if(!deletedSchedule){
                throw new Error("Schedule not found");
            }

            return deletedSchedule;

        }catch{

            throw new Error("Error Deleting Schedule");

       }
    }
} 