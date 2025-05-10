const bcrypt = require('bcryptjs');

const storedHash = "$2b$10$0OlzKyJoVyMi7MHmaNtSVO..pbiQHqS5umeATKeYWWnhq7mTP/URS"; // Hashed password from DB
const enteredPassword = "password123"; // Password you are trying in Postman

bcrypt.compare(enteredPassword, storedHash, (err, result) => {
    if (err) console.error("Error:", err);
    console.log("Password match:", result); // Should print true or false
});
