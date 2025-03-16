import  { Router } from "express";
import ScheduleDAO from "../dao/schedule-dao";
import { IScheduleAttributes } from "../models/schedule-model";
import AllocatedeqDAO from "../dao/allocatedeq-dao";
import { IAllocatedeqAttributes } from "../models/allocatedeq-model";

const router = Router();


router.post("/create", async (req, res) => {
    try {
        const { shedule_name, shedule_type, date, time_slot, place, description, capacity } = req.body;

        if (!shedule_name || !shedule_type || !date || !time_slot || !place || !description || !capacity) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create schedule entry
        const scheduleData: IScheduleAttributes = { // Added missing required field
            shedule_name,
            shedule_type,
            date,
            time_slot,
            place,
            capacity,
            description,
            status: 1,
            isActive: 1,
        };

        await ScheduleDAO.createSchedule(scheduleData);

        res.status(200).json({ message: "Schedule created successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

router.get("/viewAll", async (req, res) => {
    try {
        const schedules = await ScheduleDAO.getAllSchedules();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});


export default router;