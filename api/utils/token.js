const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const ACCESS_TOKEN_EXPIRES_IN = '60s';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

const generateToken = (id, type, expiresIn) => {
    return jwt.sign({ id, type }, process.env.JWT_SECRET, {
        expiresIn,
    });
};

const hashToken = (token) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(token, salt);
}

const compareToken = (token, hashToken) => {
    return bcrypt.compareSync(token, hashToken);
}

const verifyToken = (token) => {
    // isExpired return true if token is expired
    return jwt.verify(token, process.env.JWT_SECRET);
};

const revokeToken = (token) => {
    return jwt.revoke(token);
};

const getTokenFromHeader = (req) => {
    let token = req.headers.authorization;
    if (!token) {
        throw new Error("Token is required");
    }
    token = token.split(" ")[1];
    return token;
}

const getRefreshTokenFromHeader = (req) => {
    let token = req.headers['refresh-token'];
    if (!token) {
        throw new Error("Token is required");
    }
    return token;
}

const getUserIdFromToken = (token) => {
    return jwt.decode(token).userId;
}

const getTokenType = (token) => {
    return jwt.decode(token).type;
}
module.exports = {
    generateToken,
    verifyToken,
    revokeToken,
    getTokenFromHeader,
    getUserIdFromToken,
    getTokenType,
    getRefreshTokenFromHeader,
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN
};