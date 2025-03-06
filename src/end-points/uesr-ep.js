"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_dao_1 = __importDefault(require("../dao/user-dao"));
const router = (0, express_1.Router)();
// ✅ Check if Email Exists
router.post("/check-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const existingUser = yield user_dao_1.default.findUserByEmail(email);
    res.json({ exists: !!existingUser });
}));
// ✅ Register User
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if user exists
        const existingUser = yield user_dao_1.default.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        // Hash Password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const userData = {
            name,
            email,
            password: hashedPassword,
            role,
        };
        // Save User
        const newUser = yield user_dao_1.default.createUser(userData);
        // Generate JWT Token
        const token = jsonwebtoken_1.default.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(201).json({ message: "User registered", token, user: newUser });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}));
exports.default = router;
