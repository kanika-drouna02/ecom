import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`);
        console.log("✅ Database Connected");
    } catch (error) {
        console.log("❌ Database Connection Failed");
        console.error(error);
    }
};

export default connectDB;