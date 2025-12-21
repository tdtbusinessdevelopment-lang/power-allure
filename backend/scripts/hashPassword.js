import bcrypt from "bcrypt";

async function generateHash() {
  const password = "admin123";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  console.log("=".repeat(60));
  console.log("COPY THIS HASHED PASSWORD:");
  console.log("=".repeat(60));
  console.log(hashedPassword);
  console.log("=".repeat(60));
}

generateHash();
