const mongoose = require("mongoose");
var db;

if (process.env.NODE_ENV === "test") {
  db = "mongodb://localhost:27017/test";
} else {
  db = process.env.MONGODB_URI;
}

const StartMongoServer = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = StartMongoServer;
