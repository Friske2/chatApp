const User = require("../models/User")
const Auth = require("../models/Auth")
const { comparePassword } = require("../utils/password");
const { generateToken, verifyToken, getRefreshTokenFromHeader, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } = require("../utils/token");
const { calExpireAt } = require("../utils/date");

exports.login = async (req, res) => {
    // get email,password from req body 
    const { email, password } = req.body;
    // verify email and password 
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }
    // generate access token 
    const accessToken = generateToken(user.userId, 'access', ACCESS_TOKEN_EXPIRES_IN);
    // generate refresh token 
    const refreshToken = generateToken(user.userId, 'refresh', REFRESH_TOKEN_EXPIRES_IN);
    // save token in database 
    // set expireAt 7 days 
    const expiresAt = calExpireAt(REFRESH_TOKEN_EXPIRES_IN);
    console.log("expireAt", expiresAt);
    const auth = new Auth({
        userId: user.userId,
        token: refreshToken,
        isRevoked: false,
        createdAt: Date.now(),
        expiresAt,
    });
    await auth.save();
    // return user 
    res.json({
        "token": accessToken,
        "refreshToken": refreshToken,
        "expiresAt": expiresAt
    });
};

exports.logout = async (req, res) => {
    try {
        let token = getRefreshTokenFromHeader(req);
        const auth = await Auth.findOne({ token });
        if (!auth) {
            throw new Error("Invalid token");
        }
        // delete all token of user 
        await Auth.deleteMany({ userId: auth.userId });
        return res.json({ message: "Logout successfully" });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

exports.revokeToken = async (req, res) => {
    try {
        let token = getRefreshTokenFromHeader(req);
        console.log("Token", token);
        const auth = await Auth.findOne({ token });
        if (!auth) {
            throw new Error("Invalid token");
        }
        auth.isRevoked = true;
        await auth.save();
        return res.json({ message: "Token revoked" });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

exports.verifyToken = async (req, res) => {
    try {
        let token = getRefreshTokenFromHeader(req);
        console.log("Token", token);
        const isTokenValid = verifyToken(token);
        if (!isTokenValid) {
            throw new Error("Invalid token");
        }
        const auth = await Auth.findOne({ token });
        if (!auth) {
            throw new Error("Invalid token");
        }
        if (auth.isRevoked) {
            throw new Error("Token is revoked");
        }
        if (auth.expiresAt < Date.now()) {
            throw new Error("Token is expired");
        }
        return res.json({ message: "Token is valid" });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        let refreshToken = getRefreshTokenFromHeader(req);
        const validToken = verifyToken(refreshToken);
        if (validToken.type != 'refresh') {
            throw new Error("Invalid token type");
        }
        const auth = await Auth.findOne({ token: refreshToken });
        if (!auth) {
            throw new Error("Invalid token");
        }
        // check is token revoked 
        if (auth.isRevoked) {
            throw new Error("Token is revoked");
        }
        // check is token expired 
        if (auth.expiresAt < Date.now()) {
            throw new Error("Token is expired");
        }
        // revoke old refresh token 
        auth.isRevoked = true;
        await auth.updateOne({ isRevoked: true });
        // generate new access token 
        const newAccessToken = generateToken(auth.userId, 'access', ACCESS_TOKEN_EXPIRES_IN);
        // generate new refresh token 
        const newRefreshToken = generateToken(auth.userId, 'refresh', REFRESH_TOKEN_EXPIRES_IN);
        // save new refresh token 
        const newAuth = new Auth({
            userId: auth.userId,
            token: newRefreshToken,
            isRevoked: false,
            createdAt: Date.now(),
            expiresAt: calExpireAt(REFRESH_TOKEN_EXPIRES_IN),
        });
        await newAuth.save();
        // return new access token and new refresh token 
        res.json({
            "token": newAccessToken,
            "refreshToken": newRefreshToken,
            "expiresAt": auth.expiresAt
        });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }

};
