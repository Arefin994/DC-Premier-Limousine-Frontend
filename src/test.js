import bcrypt from 'bcrypt';

const storedHash = "$2b$10$79rOKiX35A6AZisKE1JUku/cMtxIpCtUtmu38c/KLq84I0eRWV5ey";
const passwordToCheck = "password123"; // Replace with the actual password

bcrypt.compare(passwordToCheck, storedHash)
  .then(result => {
    if (result) {
      console.log("✅ Password match!");
    } else {
      console.log("❌ Password doesn't match.");
    }
  })
  .catch(err => {
    console.error("Error comparing passwords:", err);
  });
