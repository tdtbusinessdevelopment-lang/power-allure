import bcrypt from "bcrypt";

// The hash currently in your database
const hashInDatabase = "$2b$10$N9qo4pKl3FqNw0kCljYnxO7OpCEK4lJ9pFJ7DGsEyVjlRB0kHQkmu";
const testPassword = "admin123";

async function testHash() {
  const isMatch = await bcrypt.compare(testPassword, hashInDatabase);
  console.log("Testing if password 'admin123' matches the hash:");
  console.log("Hash:", hashInDatabase);
  console.log("Match:", isMatch ? "✅ YES" : "❌ NO");
  
  if (!isMatch) {
    console.log("\nGenerating a new hash that WILL match 'admin123':");
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(testPassword, salt);
    console.log("New hash to use:");
    console.log(newHash);
  }
}

testHash();
