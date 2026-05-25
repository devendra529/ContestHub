const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`
     MongoDB Connected
    Host : ${connection.connection.host}
    DB   : ${connection.connection.name}
    `);

  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn(" MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log(" MongoDB reconnected");
});

module.exports = connectDB;