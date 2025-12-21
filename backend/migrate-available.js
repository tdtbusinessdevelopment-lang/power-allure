import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./src/config/db.js";
import LocalModel from "./src/models/LocalModel.js";
import ForeignModel from "./src/models/ForeignModel.js";
const migrateAvailableField = async () => {
  try {
    await connectDB();
    
    // Update all local models without available field
    const localResult = await LocalModel.updateMany(
      { available: { $exists: false } },
      { $set: { available: true, favoritesCount: 0 } }
    );
    
    // Update all foreign models without available field
    const foreignResult = await ForeignModel.updateMany(
      { available: { $exists: false } },
      { $set: { available: true, favoritesCount: 0 } }
    );
    
    console.log(`✅ Updated ${localResult.modifiedCount} local models`);
    console.log(`✅ Updated ${foreignResult.modifiedCount} foreign models`);
    
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};
migrateAvailableField();