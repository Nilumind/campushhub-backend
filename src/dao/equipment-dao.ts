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
}