
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        image_profil: {
            type: String,
            default: ""
        },
        password : {
            type: String,
            required: true
        },
        role : {
            type: Number,
            default: 0
        },
        date_inscription : {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            default: ''
        },
    }
);

module.exports = mongoose.model("User", userSchema);


