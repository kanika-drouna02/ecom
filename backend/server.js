import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";

dotenv.config();

const app = express();
connectDB();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Route
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});