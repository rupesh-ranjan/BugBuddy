import express from "express";
const requestRouter = express.Router();

import { userAuth } from "../middlewares/auth.js";
import ConnectionRequest from "../models/connectionRequest.js";

import User from "../models/user.js";
import user from "../models/user.js";

requestRouter.post(
    "/request/review/:status/:requestId",
    userAuth,
    async (requestRouter, res) => {
        try {
            const loggedInUser = requestRouter.user;
        } catch (error) {
            res.status(400).send("ERROR: " + error.message);
        }
    }
);
