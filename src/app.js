import express from "express";
import connectDB from "./config/database.js";
import User from "./models/user.js";
import { validateUserData } from "./utils/validation.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import { userAuth } from "./middlewares/auth.js";

console.log("Starting a new project BugBuddy with Node.js");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    try {
        console.log("Cookies: ", req.cookies);
        const errors = await validateUserData(req.body);
        console.log("Errors:", errors);
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
            console.error("Error signing up user:", error);
            res.status(500).send("Something went wrong");
        }
    }
});

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });

        if (!user || user.length === 0)
            return res.status(404).send("Invalid Credentials");
        const isValidUser = await user.validatePassword(password);
        if (!isValidUser) return res.status(404).send("Invalid Credentials");
        const token = user.getJWT();
        res.cookie("token", token);
        res.send("Logged in successfully");
    } catch {
        res.status(400).send("Something went wrong");
    }
});

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong " + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
    const user = req.user;

    res.send(user.firstName + " Connection request send");
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find({ firstName: req.body.firstName });
        if (!users) res.status(404).send("No user find");
        res.send(users);
    } catch {
        res.status(400).send("Something went wrong");
    }
});

app.get("/userById", async (req, res) => {
    try {
        const user = await User.findById(req.body._id);
        if (!user) res.status(404).send("No user find");
        res.send(user);
    } catch {
        res.status(400).send("Something went wrong");
    }
});

app.delete("/user", async (req, res) => {
    const id = req.body._id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) res.status(404).send("No user find");
        res.send("Deleted user successfully");
    } catch {
        res.status(400).send("Something went wrong");
    }
});

app.patch("/user", async (req, res) => {
    const id = req.body._id;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, data);
        if (!user) res.status(404).send("No user find");
        res.send("Updated user successfully");
    } catch {
        res.status(400).send("Something went wrong");
    }
});

app.patch("/userByEmailId", async (req, res) => {
    const emailId = req.body.emailId;
    const data = req.body;
    try {
        const user = await User.findOneAndUpdate({ emailId }, data);
        if (!user) res.status(404).send("No user find");
        res.send("Updated user successfully");
    } catch {
        res.status(400).send("Something went wrong");
    }
});

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        if (!users) res.status(404).send("No user find");
        res.send(users);
    } catch {
        res.status(400).send("Something went wrong");
    }
});

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
