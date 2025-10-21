import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String },
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: { type: String, required: true },
        age: { type: Number, required: true, min: 14 },
        gender: {
            type: String,
            required: true,
            validate(value) {
                if (!["male", "female", "others"].includes(value))
                    throw new Error("Gender is not valid");
            },
        },
        photoUrl: {
            type: String,
            default: "https://www.freeiconspng.com/img/898",
            validate: (val) => {
                if (!validator.isURL(val)) {
                    throw new Error("Photo URL is not valid");
                }
            },
        },

        about: String,
        skills: [String],
    },
    { timestamps: true }
);

userSchema.methods.getJWT = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id });
    return token;
};

export default mongoose.model("User", userSchema);
