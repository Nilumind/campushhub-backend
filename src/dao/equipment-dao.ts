import mongoose, { set } from "mongoose";
import { IEquipmentAttributes, IEquipmentModel, IEquipment  } from "../models/equipment-model";
import Equipment from "../schemas/equipment-schema";

export default class EquipmentDAO {


    //create new equipment
    static async createEquipment(equipmentData: IEquipmentAttributes){

       try{
         
        const newEquipment: IEquipment = new Equipment(equipmentData);
        await newEquipment.save();

       }catch (error) {

        throw new Error("Error creating Equipment");

      }
    }

    //update equipment
    static async updateEquipment(equipmentId: string, updatedData: Partial<IEquipmentAttributes>) {
        try {

            if (!mongoose.Types.ObjectId.isValid(equipmentId)) {
                throw new Error("Invalid Equipment ID format");
            }
    
            const updatedEquipment = await Equipment.findByIdAndUpdate(
                equipmentId, 
                { $set: updatedData }, 
                { new: true }
            );
    
            if (!updatedEquipment) {
                throw new Error("Equipment not found");
            }
    
            return updatedEquipment;
        } catch (error: any) {
            console.error("Error updating Equipment:", error);
            throw new Error(error.message || "Error updating Equipment");
        }
    }  
    
    //get equipment by id
    static async getEquipmentById(equipmentId: string) {
        try {
            const equipment = await Equipment.findById(equipmentId, { isActive: 1 });
            console.log("check equipment");
            return equipment;
        } catch (error) {
            throw new Error("Error fetching Equipment");
        }
    }

    //gett all equipment
    static async getAllEquipment() {
        try {
            const equipment = await Equipment.find({ isActive: 1 });
            return equipment;
        } catch (error) {
            throw new Error("Error fetching Equipment");
    
        }    
    }

    //delete equipment
    static async deleteEquipment(equipmentId: string) {
        try {
            const deletedEquipment = await Equipment.findByIdAndUpdate(
                equipmentId,
                { isActive: 0 },
                { new: true }
            );  

            if (!deletedEquipment) {
                throw new Error("Equipment not found");
            }

            return deletedEquipment;

         }catch (error) {
            throw new Error("Error deleting Equipment");
        }
    }

    //check availability in equipment
    static async checkAvailability(equipmentId: string, quantity: number) {
        try {
            const equipment = await Equipment.findById(equipmentId);

            if (!equipment) {
                throw new Error("Equipment not found");
            }
            if (quantity > equipment.quantity) {
                return { 
                    success: false, 
                    message: "Requested quantity exceeds available stock",
                    availableQuantity: equipment.quantity
                };
            }

            return {
                success: true,
                message: "Equipment is available",
                availableQuantity: equipment.quantity
            };
        }catch (error) {
            throw new Error("Error Checking Availability");
        }
    }
}