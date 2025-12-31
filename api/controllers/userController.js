const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const { userId, name, email, status, password } = req.body;
        const newUser = new User({ userId, name, email, status, password });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $project: {
                    id: { $toString: "$_id" },
                    userId: 1,
                    name: 1,
                    email: 1,
                    status: 1,
                    password: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    _id: 0
                }
            }
        ]);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        user.status = 'online';
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.userLogout = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.status = 'offline';
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.activeUserStatus = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.status = 'online';
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
