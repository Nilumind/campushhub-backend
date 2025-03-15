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

//update equipment route
router.post("/update", async (req, res) => {
    try {
        const { id, eq_name, quantity, available } = req.body; 

        if (!id) {
            return res.status(400).json({ message: "Equipment ID is required" });
        }

        if (!eq_name || !quantity || !available) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedData: IEquipmentAttributes = {
            eq_name,
            quantity,
            available,
            isActive: 1, 
        };

        const updatedEquipment = await EquipmentDAO.updateEquipment(id, updatedData);

        if (!updatedEquipment) {
            return res.status(404).json({ message: "Equipment not found" });
        }

        res.status(200).json({ message: "Equipment updated successfully", updatedEquipment });

    } catch (error: unknown) {
        console.error("Update Error:", error);
        if (error instanceof Error) {
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        } else {
            res.status(500).json({ message: "Internal Server Error", error: "An unknown error occurred" });
        }
    }
});

//get equipment by id route
router.get("/view/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Equipment ID is required" });
        }

        const equipment = await EquipmentDAO.getEquipmentById(id);

        if (!equipment) {
            return res.status(404).json({ message: "Equipment not found" });
        }

        res.status(200).json({ message : "equipment fetched successfully",equipment });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

//get all equipment route
router.get("/viewall", async (req, res) => {
    try {
        const equipment = await EquipmentDAO.getAllEquipment();

        res.status(200).json({ message: "All equipments fetched",equipment });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});



export default router;