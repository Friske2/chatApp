// check if user is authenticated
const { verifyToken, getTokenValue, getTokenFromHeader } = require("../utils/token");
const Auth = require("../models/Auth")
const authMiddleware = (req, res, next) => {
    try {
        let token = getTokenFromHeader(req);
        const validToken = verifyToken(token);
        if (validToken.type != 'access') {
            throw new Error('token type is not access')
        }
        const tokenValue = getTokenValue(token);
        req.userId = tokenValue.id;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: err.message });
    }
}

module.exports = authMiddleware;