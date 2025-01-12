// <---------- SETUP ---------->
// requires
const express = require("express");
const app = express();
const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
const path = require("path");
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");

// define EJS directories
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.engine("ejs", ejsMate);


// <---------- MONGOOSE ---------->
// start mongoose
main()
    .then(() => {
        console.log(`connection successful`);
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}


// <---------- ROUTES ---------->

// root directory
app.get("/", (req,res) => {
    res.send(`server running`);
});

// index route
app.get("/listings", async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
})

// new route
app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs");
})

// create route
app.post("/listings", async(req,res) => {
    const newListing = new Listing(req.body.listing)
    await newListing.save();
    res.redirect("/listings");
})

// show route
app.get("/listings/:id", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

// edit route
app.get("/listings/:id/edit", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})

// update route
app.put("/listings/:id", async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

// delete route
app.delete("/listings/:id", async (req,res)=> {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
    
})



// <---------- SERVER ---------->

// start server
app.listen(port, () =>{
    console.log(`listening to port: ${port}`);
});