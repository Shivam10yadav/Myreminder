import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import ReminderRoute from "./routes/reminder.js";
import { startReminderScheduler } from "./utils/reminderScheduler.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Routes
app.use("/api/v1", ReminderRoute);

// Start server with proper async handling
const startServer = async () => {
  try {
    // Step 1: Connect to MongoDB first
    console.log("Connecting to MongoDB...");
    await connectDB();
    
    // Step 2: Start reminder scheduler after DB is connected
    console.log("Starting reminder scheduler...");
    startReminderScheduler();
    
    // Step 3: Start Express server
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`✅ Server is running on port: ${port}`);
    });
    
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Initialize server
startServer();