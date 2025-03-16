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

            throw new Error("Error creating Schedule");

        }
    }
}