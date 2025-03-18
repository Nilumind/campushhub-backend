import { Router } from "express";
import AllocatedeqDAO from "../dao/allocatedeq-dao";
import { IAllocatedeqAttributes } from "../models/allocatedeq-model";
import EquipmentDAO from "../dao/equipment-dao";

const router = Router();

//create new allocatedeq

router.post("/create", async (req, res) => {

    try {

        const { schedule_id, equipment_id, quantity, date, time_slot } = req.body;

        if(!schedule_id || !equipment_id || !quantity || !date || !time_slot) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // If the check passes, proceed with creating the allocation
     

            const equipment = await EquipmentDAO.checkAvailability(equipment_id, quantity); 

            if(!equipment.success){
                return res.status(400).json({ message: equipment.message });
            }

            if(equipment.success){

                const checkResult = await AllocatedeqDAO.checkAllocatedeq(date, time_slot, equipment_id, quantity);

                if(!checkResult.success){
                    return res.status(400).json({ message: checkResult.message, availableQuantity: checkResult.availableQuantity });
                }

                if (checkResult.success) {
                    if (checkResult.availableQuantity === undefined) {
                        return res.status(400).json({ message: "Available quantity is undefined" });
                    }
                
                    const av_quantity = checkResult.availableQuantity - quantity;
                
                    if (av_quantity < 0) {
                        return res.status(400).json({ message: "Insufficient available quantity" });
                    }
                
                    const allocatedeqData: IAllocatedeqAttributes = {
                        schedule_id,
                        equipment_id,
                        av_quantity,
                        date,
                        time_slot,
                        status: 1,
                        isActive: 1,
                    };
                
                    await AllocatedeqDAO.createAllocatedeq(allocatedeqData);
                    
                    return res.status(201).json({ message: "Allocated Equipment created successfully", allocatedeqData });
                } 
                const av_quantity = equipment.availableQuantity - quantity;

                const allocatedeqData: IAllocatedeqAttributes = {
                    schedule_id,
                    equipment_id,
                    av_quantity,
                    date,
                    time_slot,
                    status: 1,
                    isActive: 1,
                };

                await AllocatedeqDAO.createAllocatedeq(allocatedeqData);
                return res.status(201).json({ message: "Allocated Equipment created successfully", allocatedeqData });
            
        }


    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    });
        

export default router;