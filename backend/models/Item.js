const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    description: String,
    city: String,
    image: String,
    securityDeposit: Number,
});

module.exports = mongoose.model("Item", ItemSchema);
