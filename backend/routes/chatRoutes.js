const express = require("express");
const Chat = require("../models/chat"); 
const router = express.Router();

// ➤ Send message / create chat
router.post("/", async (req, res) => {
  const { itemId, sender, content, itemName, city, ownerId } = req.body;

  try {
    let chat = await Chat.findOne({ itemId });

    if (!chat) {
      chat = new Chat({
        itemId,
        itemName,
        city,
        participants: [sender, ownerId || "Owner"], 
        messages: [],
      });
    }

    chat.messages.push({ sender, content, timestamp: new Date() });
    await chat.save();

    res.status(200).json(chat);
  } catch (err) {
    console.error("❌ Error saving chat:", err);
    res.status(500).json({ message: "Error saving chat" });
  }
});

// ➤ Get all chats for a specific user (customer)
router.get("/user/:userId", async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.params.userId });

    chats.sort((a, b) => {
      const lastA = a.messages[a.messages.length - 1]?.timestamp || 0;
      const lastB = b.messages[b.messages.length - 1]?.timestamp || 0;
      return new Date(lastB) - new Date(lastA);
    });

    res.json(chats);
  } catch (err) {
    console.error("❌ Error fetching user chats:", err);
    res.status(500).json({ message: "Error fetching user chats" });
  }
});

// ➤ Get all chats for a specific owner
router.get("/owner/:ownerId", async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.params.ownerId });

    chats.sort((a, b) => {
      const lastA = a.messages[a.messages.length - 1]?.timestamp || 0;
      const lastB = b.messages[b.messages.length - 1]?.timestamp || 0;
      return new Date(lastB) - new Date(lastA);
    });

    res.json(chats);
  } catch (err) {
    console.error("❌ Error fetching owner chats:", err);
    res.status(500).json({ message: "Error fetching owner chats" });
  }
});

// ➤ Get chat by itemId (keep this last so it doesn’t override others)
router.get("/:itemId", async (req, res) => {
  try {
    const chat = await Chat.findOne({ itemId: req.params.itemId });
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.json(chat);
  } catch (err) {
    console.error("❌ Error fetching chat:", err);
    res.status(500).json({ message: "Error fetching chat" });
  }
});

module.exports = router;

