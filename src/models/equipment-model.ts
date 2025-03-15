import { HydratedDocument, Model, PopulatedDoc } from "mongoose";


export interface IEquipmentAttributes {
    eq_name: string;
    eq_type?: string;
    quantity: number;
    available: number;
    isActive: number;
}

export type IEquipment = HydratedDocument<IEquipmentAttributes>;
export type IEquipmentModel = Model<IEquipmentAttributes>;