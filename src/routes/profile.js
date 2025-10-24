import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { validateUserData } from "../utils/validation.js";

const router = express.Router();

router.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong " + err.message);
    }
});
router.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        console.log("Entered edit");
        const errors = await validateUserData(req.body);
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

export default router;
