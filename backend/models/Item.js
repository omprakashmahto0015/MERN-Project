const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  image: { type: String },
  securityDeposit: { type: Number },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Add this line
}, { timestamps: true });

module.exports = mongoose.model("Item", ItemSchema);
