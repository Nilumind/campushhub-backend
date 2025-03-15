import { Router } from 'express';
import equipmentRoutes from "../end-points/equipment-ep";

const router = Router();

router.use("/equipment", equipmentRoutes);

export default router;
