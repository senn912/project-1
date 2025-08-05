const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

const authMiddleware = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'No token provided',
        });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: 'Invalid or expired token',
            });
        }

        req.user = decoded;
        res.locals.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
