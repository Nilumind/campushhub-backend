import { Router } from "express";
import EquipmentDAO from "../dao/equipment-dao";
import { IEquipmentAttributes } from "../models/equipment-model";

const router = Router();

//create equipment route
router.post("/create", async (req, res) => {
  try {
    const { eq_name, quantity, available } = req.body;

    if (!eq_name || !quantity || !available ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const equipmentData: IEquipmentAttributes = {
      eq_name,
      quantity,
      available,
      isActive: 1,
    };

    await EquipmentDAO.createEquipment(equipmentData);

    res.status(200).json({ message: "Equipment created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

export default router;