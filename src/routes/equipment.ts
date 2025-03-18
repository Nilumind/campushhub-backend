import { Router } from 'express';
import equipmentRoutes from "../end-points/equipment-ep";
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use("/equipment",authenticateToken, equipmentRoutes);

export default router;
