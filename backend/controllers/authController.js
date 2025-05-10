const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔹 Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log("Received data:", req.body); // ✅ Log incoming request

        if (!name || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role: role || "user" });

        console.log("Saving user:", user); // ✅ Log user object before saving

        await user.save();

        console.log("User saved successfully!"); // ✅ Log success
        res.status(201).json({ msg: "User registered successfully" });

    } catch (err) {
        console.error("Error saving user:", err); // ✅ Log error
        res.status(500).json({ msg: "Server Error" });
    }
};

// 🔹 Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", { expiresIn: "1h" });

        res.json({ token, role: user.role });  // ✅ Send role with token
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};
