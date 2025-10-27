import express from "express";
import { userAuth } from "../middlewares/auth.js";
import ConnectionRequest from "../models/connectionRequest.js";
import User from "../models/user.js";
import { Types } from "mongoose";

const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const allowedStatus = ["interested", "ignored"];

        const fromUserId = req.user._id;
        const toUserId = new Types.ObjectId(req.params.toUserId);
        const toUser = await User.findById(toUserId);
        if (toUserId.equals(fromUserId)) {
            throw new Error("Can't send request to yourself");
        }
        if (!toUser) throw new Error("No user found");
        const status = req.params.status;
        if (!allowedStatus.includes(status))
            throw new Error("Invalid status type");
        const existingConnectRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });
        if (existingConnectRequest) throw new Error("Request already exist");
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });
        const data = await connectionRequest.save();
        res.json({
            message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
            data,
        });
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
});

router.patch(
    "/request/review/:status/:requestId",
    userAuth,
    async (req, res) => {
        try {
            // validate status
            const allowedStatus = ["accepted", "rejected"];
            const { status, requestId } = req.params;
            if (!allowedStatus.includes(status))
                throw new Error("Invalid status type");

            const { _id: userId, firstName: userFirstName } = req.user;
            const request = await ConnectionRequest.findOne({
                _id: requestId,
                toUserId: userId,
                status: "interested",
            });
            // If invalid requestId
            if (!request) {
                throw new Error("No request found");
            }

            request.status = status;
            const fromUserFirstName = (await User.findById(request.fromUserId))
                .firstName;
            const data = await request.save();
            res.json({
                message: `${userFirstName} ${status} the request from ${fromUserFirstName}`,
                data,
            });
        } catch (error) {
            res.status(400).json({ message: "ERROR: " + error.message });
        }
    }
);

export default router;
