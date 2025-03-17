import  { Router } from "express";
import ScheduleDAO from "../dao/schedule-dao";
import { IScheduleAttributes } from "../models/schedule-model";
import AllocatedeqDAO from "../dao/allocatedeq-dao";
import { IAllocatedeqAttributes } from "../models/allocatedeq-model";

const router = Router();

//create schedule route
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


//view all schedules route
router.get("/viewAll", async (req, res) => {
    try {
        const schedules = await ScheduleDAO.getAllSchedules();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

//view schedule by id route

router.get("/view/:id", async (req, res) => {
    try {
        const scheduleId = req.params.id;
        const schedule = await ScheduleDAO.getScheduleById(scheduleId);

        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        res.status(200).json({message: "Schedule fetched successfully",schedule});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }

});

//update schedule route

router.post("/update", async (req, res) => {

    try {
        const { scheduleId, shedule_name, shedule_type, date, time_slot, place, description, capacity } = req.body;

        if(!scheduleId){
            return res.status(400).json({ message: "Schedule ID is required" });
        }
        if (!shedule_name || !shedule_type || !date || !time_slot || !place || !description || !capacity) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const scheduleData: IScheduleAttributes = {
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

        const schedule = await ScheduleDAO.updateSchedule(scheduleId, scheduleData);

        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        res.status(200).json({ message: "Schedule updated successfully",schedule });

    }catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }

});

//delete schedule route
router.post("/delete", async (req, res) => {
    try {
        const scheduleId = req.body.scheduleId;

        if (!scheduleId) {
            return res.status(400).json({ message: "Schedule ID is required" });
        }

        const schedule = await ScheduleDAO.deleteSchedule(scheduleId);

        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        res.status(200).json({ message: "Schedule deleted successfully", schedule });

    }catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }

});

export default router;