import { Router } from 'express';
import reservationRoutes from "../end-points/reservation-ep";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.use("/reservation", authenticateToken, reservationRoutes);

export default router;