const mongoose = require('mongoose'); // we added the mongoose library
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true // Data validation, required means this field is important, that means it is mandatory.
        // If we do not imply this, then the user cannot add the information.
    },
    lastName: {
        type: String
    },
    gender: {
        type: String,
        // enum: ["male", "female", "other"],
        uppercase: true,
    },
    age: {
        type: Number,
        min: 18,
        max: 50
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    photo: {

    }
}, { timestamps: true });

userSchema.methods.getJWT = function () {
    const ans = jwt.sign({ _id: this._id, emailId: this.emailId }, process.env.SECRET_KEY, { expiresIn: "30m" });
    return ans;
}

userSchema.methods.verifyPassword = async function (userPassword) {
    const isValid = await bcrypt.compare(userPassword, this.password);
    return isValid;
}

const User = mongoose.model("user", userSchema); //here USer is a model which follows an schema 

module.exports = User;
