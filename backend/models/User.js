const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ["admin", "user"],  
        default: "user"  
    },
    resetPasswordToken: { type: String }, // ✅ Stores reset token
    resetPasswordExpires: { type: Date }  // ✅ Expiry time for the token
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
