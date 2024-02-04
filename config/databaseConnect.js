const mongoose = require("mongoose");

const databaseConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.db_link);
    console.log(
      "database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(`Database Connection error`, error);
    process.exit(1);
  }
};

module.exports = databaseConnect;
