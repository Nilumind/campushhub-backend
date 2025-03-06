import mongoose from "mongoose";
import dotenv from "dotenv";


mongoose.set('strictQuery', true);

async function databaseSetup() {
    try {
        const uri = getMongooseUri();

        if (!uri) {
            throw new Error("MongoDB URI is not defined in environment variables.");
        }

        console.log(`🔗 Connecting to MongoDB: ${uri}`); // Debugging

        mongoose.connection.on('error', (e: Error) => {
            console.error("❌ Database connection error:", e);
        });

        await mongoose.connect(uri);
        console.log("✅ Database connected successfully");
    } catch (e) {
        console.error("❌ Database initialization failed:", e);
        process.exit(1);
    }
}


function getMongooseUri() {
    return process.env.NODE_ENV !== 'test' ? process.env.MONGOOSE_URI : process.env.TEST_MONGOOSE_URI;
}

export default databaseSetup;