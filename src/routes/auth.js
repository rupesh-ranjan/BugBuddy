import express from "express";
import bcrypt from "bcrypt";
import { validateUserSingUpData } from "../utils/validation.js";
import User from "../models/user.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const errors = await validateUserSingUpData(req.body);
        if (errors.length > 0) {
            return res.status(400).send({ errors });
        }

        // Destructure user data from request body
        // To protect so that only these fields are taken from req.body
        const {
            firstName,
            lastName,
            emailId,
            password,
            age,
            gender,
            photoUrl,
            about,
            skills,
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            firstName,
            lastName,
            emailId,
            password: hashedPassword,
            age,
            gender,
            photoUrl,
            about,
            skills,
        };
        const user = new User(newUser);
        await user.save();
        res.send("Signed up successfully");
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(
                (err) => err.message
            );
            return res.status(400).send({ errors: messages });
        } else if (error.code === 11000) {
            return res.status(400).send({ error: "Email already exists" });
        } else {
            res.status(500).send("Something went wrong");
        }
    }
});

router.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });
        if (!user) return res.status(404).send("Invalid Credentials");
        const isValidUser = await user.validatePassword(password);
        if (!isValidUser) return res.status(404).send("Invalid Credentials");
        const token = user.getJWT();
        res.cookie("token", token);
        res.send("Logged in successfully");
    } catch {
        res.status(400).send("Something went wrong");
    }
});

router.post("/logout", async (req, res) => {
    res.clearCookie("token");
    res.send("Logged out successfully");
});

export default router;
