import express from "express";
import { userAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/sendConnectionRequest", userAuth, async (requestRouter, res) => {
    try {
        // const loggedInUser = requestRouter.user;
        res.send("Coneection request Sent");
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
});

export default router;
