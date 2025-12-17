const mongoose = require('mongoose');
const {ROLES, TYPES} = require("../constants/roles");

const user = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    age: {type: Number, required: false, trim: true},
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    phone: {type: String, required: false, trim: true},
    address: {type: String, required: false, trim: true},
    picture: {
        type: String,
        required: false,
        trim: true,
        default: "https://res.cloudinary.com/dyhw94ngc/image/upload/v1752352074/21104_adut1e.png"
    },
    role: {
        type: Number,
        required: true,
        enum: [ROLES.ADMIN, ROLES.USER],
        default: ROLES.USER,
    },
    type: {
        type: String,
        required: true,
        enum: [TYPES.ADMIN, TYPES.USER],
        default: TYPES.USER,
    },
    isVerified: {type: Boolean, required: false, default: false},
    verifyCode: {type: String, required: false, default: null}
}, {timestamps: true});

const User = mongoose.model("User", user);
module.exports = User