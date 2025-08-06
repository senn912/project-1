const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

const checkAcc = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        // ko co token, gan user = null ( chua dang nhap)
        res.locals.user = null;
        return next();
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            // token k hop le, het han
            res.locals.user = null;
        } else {
            // Token hợp lệ
            res.locals.user = decoded;
        }
        return next();
    });
};

module.exports = checkAcc;
