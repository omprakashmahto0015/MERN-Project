const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");

dotenv.config(); // ✅ Ensure environment variables are loaded

const router = express.Router();

// ✅ Email Transporter (Check ENV Variables)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,  // ✅ Check this in .env
        pass: process.env.SMTP_PASS,  // ✅ Check this in .env
    },
});

// ✅ Debugging: Check if FRONTEND_URL is defined
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

// ✅ Sign up a new user
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ LOGIN a user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// ✅ FORGOT PASSWORD (Fix Reset Link)
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        // Create secure reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        // Store hashed token in DB
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // ✅ Ensure FRONTEND_URL is correct
        if (!process.env.FRONTEND_URL) {
            console.error("ERROR: FRONTEND_URL is not set in .env!");
            return res.status(500).json({ msg: "Server configuration error." });
        }

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        console.log("Reset URL:", resetUrl); // ✅ Debugging

        await transporter.sendMail({
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>Click the link below to reset your password:</p>
                   <a href="${resetUrl}">${resetUrl}</a>
                   <p>If you did not request this, please ignore this email.</p>`,
        });

        res.json({ msg: "Password reset email sent" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// ✅ RESET PASSWORD (Secure Token Validation)
router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }, // Ensure token is not expired
        });

        if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ msg: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// ✅ GET Profile (Protected Route)
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
