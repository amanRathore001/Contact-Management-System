const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
    ,
    name: {
        type: String,
        required: [true, "please add name is mandatory field"]
    },
    email: {
        type: String,
        required: [true, "please add email is mandatory field"]
    },
    phone: {
        type: String,
        required: [true, "please add phone is mandatory field"]
    }
}, { timestamps: true })

module.exports = mongoose.model("Contact", contactSchema)
