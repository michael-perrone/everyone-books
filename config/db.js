const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");


// // "mongodb://mike:perrone1@ds033579.mlab.com:33579/tennis-mate-db",
const connectDatabase = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    // dwd
    // .\mongod.exe --dbpath "\Users\Craigslist\Desktop\mongodb-data"
    console.log("mongodb connected");
  } catch (err) {
    console.log(err.message);

    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDatabase;
