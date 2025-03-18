import { Router } from "express";
import AttendenceDAO from "../dao/attendence-dao";
import { IAttendenceAttributes } from "../models/attendence-model";
import EquipmentDAO from "../dao/equipment-dao";

const router = Router();

//create attendence route
router.post("/create", async (req, res) => {
    try {
        const { schedule_id, user_id } = req.body;

        if (!schedule_id || !user_id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const checkat = await AttendenceDAO.checkAttendence(schedule_id, user_id);

        if(!checkat.success){
            return res.status(400).json({ message: checkat.message });
        }


        const attendenceData: IAttendenceAttributes = {
            schedule_id,
            user_id,
            status: 1,
            isActive: 1,
        };

        await AttendenceDAO.createAttendence(attendenceData);
        res.status(200).json({ message: "Attendence created successfully" });

    }catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

export default router;