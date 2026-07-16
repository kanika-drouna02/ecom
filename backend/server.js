import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import connectCloudinary from "./config/cloudinary.js";"./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";

dotenv.config();

const app = express();


connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);





// Route
app.get("/", (req, res) => {
    res.send("API Working");
});

const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});