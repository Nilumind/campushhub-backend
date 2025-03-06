import {IUserModel , IUser, IUserAttributes} from "../models/user-model";
import User from "../schemas/uesr-schema"

export default class UserDAO {

// ✅ Find User by Email
static async findUserByEmail(email: string) {
  try {
    return await User.findOne({ email }).lean();
  } catch (error) {
    throw new Error("Error finding user by email");
  }
}

// ✅ Create User
static async createUser(userData: IUserAttributes) {
  try {
    const newUser: IUser = new User(userData);
    return await newUser.save();
  } catch (error) {
    throw new Error("Error creating user");
  }
}

// ✅ Find User by ID
static async findUserById(userId: string) {
  try {
    return await User.findById(userId).lean();
  } catch (error) {
    throw new Error("Error finding user by ID");
  }
}

static async findUserByUniversityId(universityId: string) {
  try {
    return await User.findOne({ universityId }).lean();
  } catch (error) {
    throw new Error("Error finding user by university ID");
  }
}


// ✅ Activate/Deactivate User
static async updateUserStatus(userId: string, isActive: boolean) {
  try {
    return await User.findByIdAndUpdate(userId, { isActive }, { new: true }).lean();
  } catch (error) {
    throw new Error("Error updating user status");
  }
}
static async updateUserByEmail(email: string, updateData: Partial<IUserAttributes>) {
  return await User.updateOne({ email }, { $set: updateData });
}

// ✅ Update User Role
static async updateUserRole(userId: string, role: string) {
  try {
    return await User.findByIdAndUpdate(userId, { role }, { new: true }).lean();
  } catch (error) {
    throw new Error("Error updating user role");
  }
}
}