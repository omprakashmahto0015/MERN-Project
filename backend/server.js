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

// middleware
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// routes
app.use("/api/auth", auth);
app.use("/api/items", items);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/chats", chatRoutes);

app.get("/", (req, res) => {
    res.send({
        activestatus:true,
        error:false,

    })
})
// fetch items with full image URL
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(
      items.map((item) => ({
        ...item.toObject(),
        image: item.image?.startsWith("/uploads")
          ? `${BASE_URL}${item.image}`
          : item.image,
      }))
    );
  } catch (error) {
    console.error("❌ Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items" });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
