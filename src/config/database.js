import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://rupesh:sMG1bx5sZbsV0JGq@rupeshproject.2zm2lzt.mongodb.net/BugBuddy"
    );
};

export default connectDB;
