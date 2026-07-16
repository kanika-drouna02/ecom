import express from "express";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

import {
    placeOrder,
    placeOrderRazorpay,
    verifyRazorpay,
    userOrders,
    allOrders,
    updateStatus
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// User
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/place-razorpay", authUser, placeOrderRazorpay);
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);
orderRouter.post("/userorders", authUser, userOrders);

// Admin
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;