import User from "../models/User.js";
import bcrypt from "bcrypt";

export const hashPasswords = async (req, res) => {
  try {
    const users = await User.find({});
    for (const user of users) {
      // Check if the password is not already hashed
      if (!user.password.startsWith("$2b$")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
      }
    }
    res.status(200).json({ message: "Passwords hashed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error hashing passwords", error });
  }
};
