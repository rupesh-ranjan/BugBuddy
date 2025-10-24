import validator from "validator";
import User from "../models/user.js";

// --- Helper functions ---
function isNonEmptyString(value) {
    return typeof value === "string" && value.trim() !== "";
}

function isValidGender(value) {
    return ["male", "female", "other"].includes(value);
}

function isValidSkills(skills) {
    return (
        Array.isArray(skills) &&
        skills.length >= 1 &&
        skills.length <= 50 &&
        skills.every((s) => typeof s === "string" && s.trim() !== "")
    );
}

// --- SignUp Data validation ---
async function validateUserSingUpData(user) {
    const errors = [];

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
    } = user;

    // First name
    if (!isNonEmptyString(firstName)) {
        errors.push("First name is required and must be a non-empty string.");
    }

    // Last name (optional but must be string if present)
    if (lastName && !isNonEmptyString(lastName)) {
        errors.push("Last name must be a non-empty string.");
    }

    // Email
    if (!emailId || !validator.isEmail(emailId)) {
        errors.push("A valid email ID is required.");
    } else {
        const exists = await User.findOne({ emailId });
        if (exists) errors.push("Email already exists.");
    }

    // Password
    if (!password || !validator.isStrongPassword(password)) {
        errors.push(
            "Password is required and must be strong (include upper, lower, number, and symbol)."
        );
    }

    // Age
    if (typeof age !== "number" || age < 14) {
        errors.push("Age must be a number and at least 14.");
    }

    // Gender
    if (!isValidGender(gender)) {
        errors.push("Gender must be male, female, or other.");
    }

    // Photo URL
    if (photoUrl && !validator.isURL(photoUrl)) {
        errors.push("Photo URL is not valid.");
    }

    // About
    if (about && typeof about !== "string" && about.length < 1000) {
        errors.push("About must be a string.");
    }

    // Skills
    if (skills && !isValidSkills(skills)) {
        errors.push("Skills must be an array of 1–50 non-empty strings.");
    }

    return errors;
}

// --- EditUser Data validation ---
async function validateUserEditData(user) {
    const errors = [];

    const { firstName, lastName, age, gender, photoUrl, about, skills } = user;

    if (firstName && !isNonEmptyString(firstName)) {
        errors.push("First name is required and must be a non-empty string.");
    }

    if (lastName && !isNonEmptyString(lastName)) {
        errors.push("Last name must be a non-empty string.");
    }

    if (typeof age !== "number" || age < 14) {
        errors.push("Age must be a number and at least 14.");
    }

    if (!isValidGender(gender)) {
        errors.push("Gender must be male, female, or other.");
    }

    if (photoUrl && !validator.isURL(photoUrl)) {
        errors.push("Photo URL is not valid.");
    }

    if (about && typeof about !== "string" && about.length < 1000) {
        errors.push("About must be a string.");
    }

    if (skills && !isValidSkills(skills)) {
        errors.push("Skills must be an array of 1–50 non-empty strings.");
    }

    return errors;
}

export { validateUserSingUpData, validateUserEditData };
