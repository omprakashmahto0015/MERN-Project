const express = require("express");
const multer = require("multer");
const path = require("path");
const Item = require("../models/Item");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// 🔹 POST: List a new item
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
    try {
        const { name, category, price, description, city, securityDeposit } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
        const userId = req.user.id; // Extract user ID from the token

        console.log("🔹 Listing Item for User:", userId); // Debugging

        const newItem = new Item({
            name,
            category,
            price,
            description,
            city,
            image: imageUrl,
            securityDeposit,
            owner: userId, // Associate item with the logged-in user
        });

        await newItem.save();
        res.json({ msg: "Item listed successfully!", item: newItem });
    } catch (err) {
        console.error("❌ Error listing item:", err.message);
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
});

// 🔹 GET: Fetch all listed items for the logged-in user
router.get("/listed", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from token
        console.log("🔹 Logged-in User ID:", userId); // Debugging

        if (!userId) {
            return res.status(400).json({ msg: "Invalid user ID in token" });
        }

        const items = await Item.find({ owner: userId });

        console.log("🔹 Fetched Items:", items); // Debugging

        res.json(items);
    } catch (err) {
        console.error("❌ Error fetching listed items:", err.message);
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
});

module.exports = router;
