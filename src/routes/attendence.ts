import { Router } from 'express';
import attendenceRoutes from "../end-points/attendence-ep";
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use("/attendence",authenticateToken, attendenceRoutes);

export default router;