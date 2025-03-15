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
            const equipment = await Equipment.findById(equipmentId);
            console.log("check equipment");
            return equipment;
        } catch (error) {
            throw new Error("Error fetching Equipment");
        }
    }

    //gett all equipment
    static async getAllEquipment() {
        try {
            const equipment = await Equipment.find();
            return equipment;
        } catch (error) {
            throw new Error("Error fetching Equipment");
    
        }    
    }
}