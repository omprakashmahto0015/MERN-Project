const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  itemId: Number,
  itemName: String,
  city: String,
  participants: [String],
  messages: [
    {
      sender: String,
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);

