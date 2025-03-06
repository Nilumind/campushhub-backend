import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserDAO from "../dao/user-dao";
import { IUserAttributes } from "../models/user-model";
import { sendEmailVerification } from "../utils/email-service"

const router = Router();

// ✅ Check if Email Exists
router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  const existingUser = await UserDAO.findUserByEmail(email);
  res.json({ exists: !!existingUser });
});

router.get("/verify-email", async (req, res) => {
  try {
    const token = req.query.token as string || req.body.token as string || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const user = await UserDAO.findUserByEmail(decoded.email);

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // ✅ Update user using DAO
      await UserDAO.updateUserByEmail(decoded.email, {
        isEmailVerified: true,
        accountStatus: "ACTIVE",
      });

      res.json({ message: "Email verified successfully" });
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Register User
router.post("/register", async (req, res) => {
  try {
      const { name, email, password, role, universityId, phoneNumber, department } = req.body;
      if (!name || !email || !password || !role) {
          return res.status(400).json({ message: "All fields are required" });
      }

      // Validate Password Strength
      if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
          return res.status(400).json({ message: "Password must be at least 8 characters, include a number and an uppercase letter" });
      }

      // Check for duplicate email or university ID
      const existingUser = await UserDAO.findUserByEmail(email);
      if (existingUser) {
          return res.status(400).json({ message: "Email already registered" });
      }

      if (universityId) {
          const existingIdUser = await UserDAO.findUserByUniversityId(universityId);
          if (existingIdUser) {
              return res.status(400).json({ message: "University ID already registered" });
          }
      }

      // Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData: IUserAttributes = {
          name,
          email,
          password: hashedPassword,
          role,
          universityId,
          phoneNumber,
          department,
          accountStatus: "PENDING",
          isEmailVerified: false,
      };

      // Save User
      const newUser = await UserDAO.createUser(userData);

      // Send Email Verification
      const verificationToken = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
      await sendEmailVerification(email, verificationToken);

      res.status(201).json({ message: "User registered. Please verify your email.", user: newUser });
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
  }
});

export default router;