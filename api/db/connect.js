const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = () => {
  return mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.0etjhly.mongodb.net/?retryWrites=true&w=majority",
    {},
    console.log("connected to mongodb atlas")
  );
};

module.exports = connectDB;
