const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 User Dashboard (Regular Users)
router.get("/user", verifyToken, (req, res) => {
    res.json({ msg: `Welcome User: ${req.user.id}` });
});

// 🔹 Admin Dashboard (Only Admins)
router.get("/admin", verifyToken, isAdmin, (req, res) => {
    res.json({ msg: "Welcome Admin! You have full access." });
});

module.exports = router;
