const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "please add username is mandatory field"]
    },
    email: {
        type: String,
        required: [true, "please add email is mandatory field"],
        unique: [true, "email already exists"]
    },
    password: {
        type: String,
        required: [true, "Please add password"],
    },

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)
