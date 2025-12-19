// Quick test script to see what data is in the database
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectAndCheck = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Get the Local collection
    const db = mongoose.connection.db;
    const localCollection = db.collection("Local");
    
    // Get one document to see the structure
    const sampleDoc = await localCollection.findOne();
    console.log("\n=== Sample document from 'Local' collection ===");
    console.log(JSON.stringify(sampleDoc, null, 2));
    
    // Get the Foreign collection
    const foreignCollection = db.collection("Foreign");
    const sampleForeign = await foreignCollection.findOne();
    console.log("\n=== Sample document from 'Foreign' collection ===");
    console.log(JSON.stringify(sampleForeign, null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

connectAndCheck();
