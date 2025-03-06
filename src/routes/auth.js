"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uesr_ep_1 = __importDefault(require("../end-points/uesr-ep"));
const router = (0, express_1.Router)();
router.use("/users", uesr_ep_1.default);
exports.default = router;
