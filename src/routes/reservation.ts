import { Router } from 'express';
import reservationRoutes from "../end-points/reservation-ep";

const router = Router();

router.use("/reservation", reservationRoutes);

export default router;