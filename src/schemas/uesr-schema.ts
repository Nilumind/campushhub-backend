import mongoose, { Schema, SchemaOptions } from "mongoose";
import { IUser, IUserAttributes, IUserModel, UserRole } from "../models/user-model";

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: { virtuals: true },
};

const UserSchema = new Schema<IUserAttributes, IUserModel>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    isActive: { type: Boolean, default: true },
    universityId: { type: String, unique: true, sparse: true },
    phoneNumber: { type: String },
    department: { type: String },
    accountStatus: { type: String, enum: ["PENDING", "ACTIVE", "SUSPENDED"], default: "PENDING" },
    isEmailVerified: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model<IUserAttributes, IUserModel>("User", UserSchema);

export default User;