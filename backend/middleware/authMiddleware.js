const jwt = require("jsonwebtoken");

// ✅ Verify Token Middleware
const verifyToken = (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ msg: "No token provided. Authorization denied." });
        }

        // 🔐 Extract token from "Bearer <token>"
        if (token.startsWith("Bearer ")) {
            token = token.slice(7).trim();
        }

        // ✅ Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request

        console.log("🔹 Authenticated user:", decoded); // Debugging
        next();
    } catch (err) {
        console.error("❌ Token verification failed:", err.message);
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
};

// ✅ Admin-Only Access Middleware
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ msg: "Access denied: Admins only" });
    }
    next();
};

module.exports = { verifyToken, isAdmin };
