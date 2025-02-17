const errorHandler = require("../middlewares/errorHandler");
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password, } = req.body;
    if (!username || !email || !password) {
        res.status(400); // Set HTTP status code
        throw new Error("Please provide usename, email, and password.")
    }
    const userAvail = await User.findOne({ email })
    if (userAvail) {
        res.status(400); // Set HTTP status code
        throw new Error("User already exits.")
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    console.log("User created", user); // Logs the body object correctly
    if (user) {
        res.status(201).json({ _id: user._id, email: user.email })
    } else {
        res.status(401);
        throw new Error("User data not valid")
    }
    res.status(201).json(user);
    res.json({ message: "Register the User" })
})
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required")
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.ACCESS_TOKEN_SECRET
            , { expiresIn: "1h" }
        )
        res.status(200).json({ accessToken })
    } else {
        res.status(401);
        throw new Error("Email or password is not valid")
    }

})
const currentUserInfo = asyncHandler(async (req, res) => {
    res.json(req.user)
})
module.exports = {
    registerUser, loginUser, currentUserInfo
}