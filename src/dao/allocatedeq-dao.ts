import mongoose, { set } from "mongoose";
import { IAllocatedeqAttributes, IAllocatedeqModel, IAllocatedeq  } from "../models/allocatedeq-model";
import Allocatedeq from "../schemas/allocatedeq-schema";
import Equipment from "../schemas/equipment-schema";

export default class AllocatedeqDAO {

    //create new allocatedeq
    static async createAllocatedeq(allocatedeqData: IAllocatedeqAttributes){
        try{
         
            const newAllocatedeq: IAllocatedeq = new Allocatedeq(allocatedeqData);
            await newAllocatedeq.save();
    
           }catch (error) {
    
            throw new Error("Error creating Equipment");
    
          }

    }

    //check  available allocatedeq in date and time
    static async checkAllocatedeq(date: string, time_slot: string, equipment_id: string, quantity: number) {
        try {
            // Find the allocated equipment based on given filters
            const allocatedeq = await Allocatedeq.findOne({
                equipment_id: equipment_id,
                date: date,
                time_slot: time_slot,
                isActive: 1
            })
            .sort({ createdAt: -1 })  // Sorting by the 'createdAt' field in descending order to get the latest record
            .limit(1); 

            
            if (allocatedeq) {
                // If there is an allocation, check if the requested quantity exceeds available quantity
                if (quantity > allocatedeq.av_quantity) {
                    return { 
                        success: false, 
                        message: "Requested quantity exceeds available quantity for the given date and time",
                        availableQuantity: allocatedeq.av_quantity
                    };
                }
            
                // If the requested quantity is within the available quantity
                return {
                    success: true,
                    message: "Equipment is available",
                    availableQuantity: allocatedeq.av_quantity
                };
            } else {
                // If no allocation is found, assume equipment is available

                const equipment = await Equipment.findById(equipment_id);

                if (!equipment) {
                    return { success: false, message: "Equipment not found" };
                }

                return {
                    success: true,
                    message: "Equipment is available",
                    availableQuantity: equipment.quantity // No allocation, so all equipment is available
                };
            }
            
    
        } catch (error) {
            throw new Error("Error checking allocated equipment");
        }
    }

}