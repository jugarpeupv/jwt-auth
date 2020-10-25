// brew services start mongodb-community@4.4 --> use this command to start mongodb as a macos service

// Then use command "mongo" in terminal to start the server. Now you can use show dbs to see the databases

// mongoose.connect("mongodb://localhost/nameofthedb, {options}")

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/simplejwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected"));
