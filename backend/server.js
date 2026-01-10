const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const auth = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboardRoutes");
const items = require("./routes/items");
const chatRoutes = require("./routes/chatRoutes");
const Item = require("./models/Item"); // ✅ Fix: Import the Item model

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${PORT}`;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // ✅ Serve images statically

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/auth", auth); // ✅ Authentication Routes
app.use("/api/items", items); // ✅ Item Routes
app.use("/api/dashboard", dashboardRoutes); // ✅ Role-Based Dashboard
app.use("/api/chats", chatRoutes); // ✅ Chat routes added

// ✅ Fetch all items with full image URL
app.get("/api/items", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(
            items.map((item) => ({
                ...item.toObject(),
                image: item.image.startsWith("/uploads") ? `${BASE_URL}${item.image}` : item.image,
            }))
        );
    } catch (error) {
        console.error("❌ Error fetching items:", error);
        res.status(500).json({ message: "Error fetching items" });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
