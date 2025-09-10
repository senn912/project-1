const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET || "your_secret_key";
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.send(`<script>
            alert("You must log in to access this page!");
            window.location.href = "/login";
        </script>`);
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.send(`<script>
                alert("Invalid or expired session. Please log in again.");
                window.location.href = "/login";
            </script>`);
    }
    req.user = decoded;
    res.locals.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
