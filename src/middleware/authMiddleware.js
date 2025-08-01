const jwt = require('jsonwebtoken');

// Nên dùng biến môi trường trong thực tế
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

const authMiddleware = (req, res, next) => {
    // Lấy token từ header Authorization (Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // tách 'Bearer <token>' lấy token

    if (!token) {
        return res.status(401).json({
            message: 'No token provided',
        });
    }

    // Xác minh token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: 'Invalid or expired token',
            });
        }

        // Nếu hợp lệ, lưu thông tin user vào request để sử dụng sau
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
