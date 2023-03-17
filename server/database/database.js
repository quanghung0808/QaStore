const mongoose = require("mongoose");

async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect mongoose successfully");
    return connection;
  } catch (error) {
    debugger;
    console.log(error);
    throw new Error("Cannot connect to Mongodb");
  }
}

module.exports = connect;
