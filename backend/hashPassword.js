const bcrypt = require('bcryptjs');

const newPassword = "password123"; // Set the new password
const saltRounds = 10;

bcrypt.hash(newPassword, saltRounds, (err, hash) => {
    if (err) {
        console.error("Error hashing password:", err);
    } else {
        console.log("New hashed password:", hash);
    }
});


