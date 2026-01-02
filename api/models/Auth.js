const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
    userId: {
        type: Number,
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
});

module.exports = mongoose.model("auth", AuthSchema);