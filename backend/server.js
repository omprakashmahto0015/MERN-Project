const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const auth = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboardRoutes");
const items = require("./routes/items");
const chatRoutes = require("./routes/chatRoutes");
const Item = require("./models/Item");

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;

// ================= MIDDLEWARE =================
app.use(express.json());

// ✅ FINAL SAFE CORS (Vercel + Browser + Preflight FIXED)
app.use(
  cors({
    origin: true, // allow all origins dynamically (Vercel safe)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Preflight handler (MOST IMPORTANT)
app.options("*", cors());

// static uploads
app.use("/uploads", express.static("uploads"));

// ================= DATABASE =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ================= ROUTES =================
app.use("/api/auth", auth);
app.use("/api/items", items);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/chats", chatRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.json({
    activeStatus: true,
    error: false,
  });
});

// ================= ITEMS WITH FULL IMAGE URL =================
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(
      items.map((item) => ({
        ...item.toObject(),
        image:
          item.image?.startsWith("/uploads")
            ? `${BASE_URL}${item.image}`
            : item.image,
      }))
    );
  } catch (error) {
    console.error("❌ Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items" });
  }
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
