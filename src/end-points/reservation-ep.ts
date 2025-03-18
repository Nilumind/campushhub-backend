import { Router } from "express";
import ReservationDAO from "../dao/reservation-dao";
import { IReservationAttributes } from "../models/reservation-model";

const router = Router();

//create reservation route
router.post("/create", async (req, res) => {
    try {
        const { facilityName, capacity, requestedBy, scheduleType, scheduleName, timeSlot, status, description, date, equipmentId, equipmentQuantity } = req.body;

        if (!facilityName || !capacity || !requestedBy || !scheduleType || !scheduleName || !timeSlot || !status || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const reservationData: IReservationAttributes = {
            facilityName,
            capacity,
            requestedBy,
            scheduleType,
            scheduleName,
            timeSlot,
            status,
            description,
            date,
            equipmentId,
            equipmentQuantity,
        };

        await ReservationDAO.addReservation(reservationData);

        res.status(200).json({ message: "Reservation created successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

//update reservation route
router.post("/update", async (req, res) => {
    try {
        const { id, facilityName, capacity, requestedBy, scheduleType, scheduleName, timeSlot, status, description, date } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Reservation ID is required" });
        }

        if (!facilityName || !capacity || !requestedBy || !scheduleType || !scheduleName || !timeSlot || !status || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedData: IReservationAttributes = {
            facilityName,
            capacity,
            requestedBy,
            scheduleType,
            scheduleName,
            timeSlot,
            status,
            description,
            date,
        };

        const updatedReservation = await ReservationDAO.updateReservation(id, updatedData);

        if (!updatedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.status(200).json({ message: "Reservation updated successfully", updatedReservation });

    } catch (error: unknown) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

//delete reservation route
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Reservation ID is required" });
        }

        const deletedReservation = await ReservationDAO.deleteReservation(id);

        if (!deletedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.status(200).json({ message: "Reservation deleted successfully" });

    } catch (error: unknown) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

//get all reservations route
router.get("/viewall", async (req, res) => {
    try {
        const reservations = await ReservationDAO.getReservations();

        res.status(200).json({ message: "All reservations fetched", reservations });

    } catch (error: unknown) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

//get reservation by id route
router.get("/view/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Reservation ID is required" });
        }

        const reservation = await ReservationDAO.getReservationById(id);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.status(200).json({ message: "Reservation fetched successfully", reservation });

    } catch (error: unknown) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});



export default router;