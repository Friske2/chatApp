const mongoose = require('mongoose');
const { generateId } = require('../utils/uuid');

const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true, default: generateId }, // Optional: separate from _id if you want to keep your JSON structure
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String, default: 'offline' },
    password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);
