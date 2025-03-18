import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/database";
import authRoutes from "./routes/auth";
import equipmentRoutes from "./routes/equipment";
import allocatedeqRoutes from "./routes/allocatedeq";
import scheduleRoutes from "./routes/schedule";
import attendenceRoutes from "./routes/attendence";

import reservationRoutes from "./routes/reservation";

require("dotenv").config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api", authRoutes, equipmentRoutes, allocatedeqRoutes, scheduleRoutes, attendenceRoutes, reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));