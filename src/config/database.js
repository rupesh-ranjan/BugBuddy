import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://rupesh:MTnOpVhcEqa3imyd@rupeshproject.2zm2lzt.mongodb.net/BugBuddy"
    );
};

export default connectDB;
