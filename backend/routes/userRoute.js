import express from "express";
import {
    registerUser,
    loginUser,
    adminLogin,
    addToCart,
    updateCart,
    getUserCart
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

userRouter.post("/get", authUser, getUserCart);
userRouter.post("/add", authUser, addToCart);
userRouter.post("/update", authUser, updateCart);

export default userRouter;