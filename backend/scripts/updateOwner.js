const mongoose = require("mongoose");
const Item = require("./models/Item"); // Adjust the path if needed
const User = require("./models/User"); // Assuming you have a User model

const updateItemsWithOwner = async () => {
    await mongoose.connect("mongodb://localhost:27017/rent-items-marketplace", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Get a random user ID (or set manually)
    const user = await User.findOne(); // Fetch first user from DB
    if (!user) {
        console.log("No users found! Create a user first.");
        return;
    }

    // Update all items with an owner
    await Item.updateMany({}, { owner: user._id });

    console.log("All items updated with an owner!");
    mongoose.connection.close();
};

updateItemsWithOwner();
