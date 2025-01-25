// <---------- DATABASE INITIALIZATION ---------->

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});             // prior data deleted
  initData.data = initData.data.map((obj) => ({...obj, owner: "678d219cb9e9a79e22c2c2ae"}));
  await Listing.insertMany(initData.data);  // new data added from ./data.js
  console.log("data was initialized");
};

initDB();
