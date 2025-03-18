import { Router } from 'express';
import attendenceRoutes from "../end-points/attendence-ep";

const router = Router();

router.use("/attendence", attendenceRoutes);

export default router;