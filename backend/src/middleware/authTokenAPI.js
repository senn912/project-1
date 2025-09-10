const jwt = require("jsonwebtoken");
const { checkUserById } = require("../services/CRUDServices");

const authTokenAPI = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET || "your-secret-key",
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      try {
        const user = await checkUserById(decoded.id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
      } catch (dbErr) {
        console.error("DB error:", dbErr);
        res.status(500).json({ message: "Server error" });
      }
    }
  );
};

module.exports = { authTokenAPI };
