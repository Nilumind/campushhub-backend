import { Router } from 'express';
import allocatedeqRoutes from "../end-points/allocatedeq-ep";
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use("/allocatedeq",authenticateToken, allocatedeqRoutes);

export default router;