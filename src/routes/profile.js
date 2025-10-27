import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { validateUserUpdateData } from "../utils/validation.js";
import validator from "validator";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

router.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong " + err.message);
    }
});

router.patch("/profile/update", userAuth, async (req, res) => {
    try {
        const validUpdateFields = [
            "firstName",
            "lastName",
            "age",
            "gender",
            "photoUrl",
            "about",
            "skills",
        ];
        const isValidUpdate = Object.keys(req.body).every((field) =>
            validUpdateFields.includes(field)
        );
        if (!isValidUpdate) {
            return res.status(400).send({ error: "Invalid update fields!" });
        }
        const errors = await validateUserUpdateData(req.body);
        if (errors.length > 0) {
            return res.status(400).send({ errors });
        }

        const user = req.user;
        Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
        await user.save();
        res.json({
            message: `${user.firstName}, your profile updated sucessfully`,
            data: user,
        });
    } catch (err) {
        res.status(400).send("Something went wrong " + err.message);
    }
});

router.patch("/profile/updatePassword", userAuth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = req.user;
        const isOldPasswardValid = await user.validatePassword(oldPassword);
        if (!isOldPasswardValid)
            return res.status(400).send("Old password is incorrect.");

        if (!newPassword || !validator.isStrongPassword(newPassword)) {
            return res
                .status(400)
                .send(
                    "Password is required and must be strong (include upper, lower, number, and symbol)."
                );
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({
            message: `${user.firstName}, your password updated sucessfully`,
            data: user,
        });
    } catch (err) {
        res.status(400).send("Error " + err.message);
    }
});

router.patch("/profile/forgotPassword", async (req, res) => {
    try {
        const { emailId, firstName, age, gender, newPassword } = req.body;
        const user = await User.findOne({ emailId });
        if (!user) return res.status(404).send("User not found");
        console.log(firstName, user.firstName);
        console.log(firstName !== user.firstName);
        if (
            user.firstName !== firstName ||
            user.age !== age ||
            user.gender !== gender
        )
            return res.status(404).send("Authentication failed");
        if (!newPassword || !validator.isStrongPassword(newPassword)) {
            return res
                .status(400)
                .send(
                    "Password must be strong (include upper, lower, number, and symbol)."
                );
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({
            message: `${user.firstName}, your password updated sucessfully`,
            data: user,
        });
    } catch (err) {
        res.status(400).send("Error " + err.message);
    }
});

export default router;
