const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
    iat: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    isRevoked: {
        type: Boolean,
        default: false,
    },
    expiresAt: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Number,
    },
    message: {
        type: String,
    }
});

module.exports = mongoose.model("auth", AuthSchema);