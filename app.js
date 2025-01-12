const express = require("express");
const app = express();
const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
const path = require("path");
const mongoose = require('mongoose');

const Listing = require("./models/listing.js");

// define EJS directories
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));


// start mongoose
main()
    .then(() => {
        console.log(`connection successful`);
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}


app.get("/testlisting", async (req,res) => {
    let sampleListing = new Listing({
        title: "My New Villa",
        description: "By the beach",
        price: 1200,
        location: "Calangute, Goa",
        country: "India"
    });

    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing");
})



// root directory
app.get("/", (req,res) => {
    res.send(`server is running`);
});


// start server
app.listen(port, () =>{
    console.log(`listening to port: ${port}`);
});