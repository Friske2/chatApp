// check if user is authenticated
const { verifyToken } = require("../utils/token");
const authMiddleware = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        token = token.split(" ")[1];
        const validToken = verifyToken(token);
        if (validToken.type != 'access') {
            throw new Error('token type is not access')
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = authMiddleware;