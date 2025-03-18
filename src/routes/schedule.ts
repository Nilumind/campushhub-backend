import { Router } from 'express';
import scheduleRoutes from "../end-points/schedule-ep";
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use("/schedule",authenticateToken, scheduleRoutes);

export default router;