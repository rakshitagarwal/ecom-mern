const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://rakshit:rakshit310@cluster0.qfsdpwi.mongodb.net/ecommerce?retryWrites=true&w=majority")
    .then(() => {
      console.log(`MongoDB connected `);
    })
};

module.exports = connectDatabase
