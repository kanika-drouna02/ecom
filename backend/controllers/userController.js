import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";



const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
    console.log("REGISTER API HIT");

    try {

        const { name, email, password } = req.body;
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            });
        }
        if (!validator.isLength(password, { min: 6 })) {
            return res.json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            cartData: {}
        });


        const user = await newUser.save();
        const token = createToken(user._id);

        return res.json({
            success: true,
            token
        });

    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: error.message
        });
    }

};

const loginUser = async (req, res) => {
    console.log("LOGIN API HIT");

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User doesn't exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = createToken(user._id);

        return res.json({
            success: true,
            token
        });

    } catch (error) {
        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });
    }

}

export { loginUser, registerUser };