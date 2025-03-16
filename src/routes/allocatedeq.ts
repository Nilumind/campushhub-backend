import { Router } from 'express';
import allocatedeqRoutes from "../end-points/allocatedeq-ep";

const router = Router();

router.use("/allocatedeq", allocatedeqRoutes);

export default router;