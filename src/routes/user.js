import { Router } from "express";
import { userAuth } from "../middlewares/auth.js";
import ConnectionRequest from "../models/connectionRequest.js";
import User from "../models/user.js";

const router = Router();
const USER_SAFE_FIELDS = "firstName lastName age gender photoUrl about skills";

// Get all the pending connections requests for logged in user
router.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const user = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: user._id,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_FIELDS);

        res.status(200).json({
            message: "All connection request for " + user.firstName,
            data: connectionRequests,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/user/connections", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: user._id, status: "accepted" },
                { toUserId: user._id, status: "accepted" },
            ],
        })
            .populate("fromUserId", USER_SAFE_FIELDS)
            .populate("toUserId", USER_SAFE_FIELDS);
        const data = connections.map((connection) =>
            connection.fromUserId.equals(user._id)
                ? connection.toUserId
                : connection.fromUserId
        );

        res.status(200).json({
            message: "All connection request for " + user.firstName,
            data,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/user/feed/", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        if (limit > 50) limit = 50;
        const requests = await ConnectionRequest.find({
            $or: [{ fromUserId: user._id }, { toUserId: user._id }],
        });
        const excludedUserIds = requests.reduce(
            (acc, curr) => {
                curr.fromUserId.equals(user._id)
                    ? acc.push(curr.toUserId)
                    : acc.push(curr.fromUserId);
                return acc;
            },
            [user._id]
        );
        const feed = await User.find({ _id: { $nin: excludedUserIds } })
            .skip((page - 1) * limit)
            .limit(limit)
            .select(USER_SAFE_FIELDS);

        res.status(200).json({
            message: "User feed for " + user.firstName,
            data: feed,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
