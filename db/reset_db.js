const mongoose = require("mongoose");

async function resetDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
    });
    console.log("Mongoose connection established");
    console.log(`Current database: ${mongoose.connection.name}`);
  } catch (error) {
    console.log(error);
  }
  try {
    await mongoose.connection.dropDatabase(() => {
      console.log("Database dropped");
      mongoose.connection.close();
      console.log("Mongoose disconnected");
    });
  } catch (error) {
    console.log(error);
  }
}

resetDatabase();
