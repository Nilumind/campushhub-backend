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
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('strictQuery', true);
function databaseSetup() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uri = getMongooseUri();
            if (!uri) {
                throw new Error("MongoDB URI is not defined in environment variables.");
            }
            console.log(`🔗 Connecting to MongoDB: ${uri}`); // Debugging
            mongoose_1.default.connection.on('error', (e) => {
                console.error("❌ Database connection error:", e);
            });
            yield mongoose_1.default.connect(uri);
            console.log("✅ Database connected successfully");
        }
        catch (e) {
            console.error("❌ Database initialization failed:", e);
            process.exit(1);
        }
    });
}
function getMongooseUri() {
    return process.env.NODE_ENV !== 'test' ? process.env.MONGOOSE_URI : process.env.TEST_MONGOOSE_URI;
}
exports.default = databaseSetup;
