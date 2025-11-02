import User from "../models/user.js";
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token)
            return res.status(401).send("Access denied. No token provided.");
        const { _id } = jwt.verify(token, "mysecretkey");

        const user = await User.findById(_id);
        if (!user) res.status(404).send("No user find");
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
};
export { userAuth };
