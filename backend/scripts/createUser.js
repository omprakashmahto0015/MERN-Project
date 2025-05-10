require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

async function createUser() {
  const email = "omprakash@example.com";
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    console.log("⚠️ User already exists! No need to create a new one.");
    mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = new User({
    name: "Omprakash",
    email,
    password: hashedPassword,
  });

  await user.save();
  console.log("🎉 User created successfully!");
  mongoose.disconnect();
}

createUser();
