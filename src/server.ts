import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/database";
import authRoutes from "./routes/auth";
import equipmentRoutes from "./routes/equipment";

require("dotenv").config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api", authRoutes, equipmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));