import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    console.log("Connecting to MongoDB...", process.env.DB_CONNECT);
    await mongoose.connect(process.env.DB_CONNECT, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};