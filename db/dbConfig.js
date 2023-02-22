const mongoose = require("mongoose");

const DB = process.env.DATA_BASE;

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DataBase Connected to PROSESWEB"))
  .catch((err) => {
    console.log(err);
  });