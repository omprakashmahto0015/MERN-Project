const jwt = require("jsonwebtoken");

// ✅ Verify Token Middleware
const verifyToken = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        token = token.replace("Bearer ", "").trim();
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // ✅ Attach user info to request

        console.log("🔹 Decoded User:", decoded); // Debugging
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};

// ✅ Admin-Only Access Middleware
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ msg: "Access denied, admin only" });
    }
    next();
};

module.exports = { verifyToken, isAdmin };
