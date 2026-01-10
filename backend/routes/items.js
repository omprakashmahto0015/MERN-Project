const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Item = require("../models/Item");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Load environment variables
require("dotenv").config();
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// 🔹 Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/* ─────────────────────────────────────────────
   🔹 POST /api/items (Add New Item)
────────────────────────────────────────────── */
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, description, city, securityDeposit } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
    const userId = req.user.id;

    const newItem = new Item({
      name,
      category,
      price,
      description,
      city,
      image: imageUrl,
      securityDeposit,
      owner: userId,
    });

    await newItem.save();
    res.json({ msg: "Item listed successfully!", item: newItem });
  } catch (err) {
    console.error("❌ Error listing item:", err.message);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

/* ─────────────────────────────────────────────
   🔹 GET /api/items/listed (Fetch User's Items)
────────────────────────────────────────────── */
router.get("/listed", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ msg: "Invalid user ID in token" });
    }

    const items = await Item.find({ owner: userId });

    const updatedItems = items.map((item) => ({
      ...item.toObject(),
      image: item.image?.startsWith("/uploads") ? `${BASE_URL}${item.image}` : item.image,
    }));

    res.json(updatedItems);
  } catch (err) {
    console.error("❌ Error fetching listed items:", err.message);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

/* ─────────────────────────────────────────────
   🔹 GET /api/items/all (Fetch All Items for Browse)
────────────────────────────────────────────── */
router.get("/all", async (req, res) => {
  try {
    const items = await Item.find();
    const updatedItems = items.map((item) => ({
      ...item.toObject(),
      image: item.image?.startsWith("/uploads") ? `${BASE_URL}${item.image}` : item.image,
    }));

    res.json(updatedItems);
  } catch (error) {
    console.error("❌ Error fetching items:", error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
});

/* ─────────────────────────────────────────────
   🔴 DELETE /api/items/:id (Delete an Item)
────────────────────────────────────────────── */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.id;

    // ✅ Check if the item exists and belongs to the logged-in user
    const item = await Item.findOne({ _id: itemId, owner: userId });
    if (!item) {
      return res.status(404).json({ msg: "Item not found or unauthorized" });
    }

    // ✅ Delete the image file if it exists
    if (item.image && item.image.startsWith("/uploads")) {
      const filePath = path.join(__dirname, "../..", item.image);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.warn("⚠️ Image file not found or already deleted.");
        }
      });
    }

    // ✅ Delete the item from the database
    await Item.findByIdAndDelete(itemId);

    res.json({ msg: "Item deleted successfully!" });
  } catch (err) {
    console.error("❌ Error deleting item:", err.message);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

module.exports = router;
