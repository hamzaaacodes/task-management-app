const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Database is connected Sucessfully! ${conn.connection.host}/${conn.connection.name}`
    );
  } catch (error) {
    console.log("Database connection failed!", error);
    process.exit(1);
  }
};

module.exports = connectDB;
