import { Router } from 'express';
import scheduleRoutes from "../end-points/schedule-ep";

const router = Router();

router.use("/schedule", scheduleRoutes);

export default router;