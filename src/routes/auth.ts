import { Router } from "express";
import userRoutes from "../end-points/uesr-ep";

const router = Router();

router.use("/users", userRoutes);
export default router;