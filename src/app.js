import express from "express";
import connectDB from "./config/database.js";
import User from "./models/user.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";

console.log("Starting a new project BugBuddy with Node.js");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
// app.use("/", authRouter, profileRouter, requestRouter);

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });
    })
    .catch((err) => {
        console.log("Error connecting to database", err);
    });
