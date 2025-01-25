// <---------- SETUP ---------->

// requires
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expErr.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const filterTags = require("./models/filters.js");

// require routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// options and constants
const port = 8080;
const dbUrl = process.env.ATLASDB_URL;
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error", () => {
    console.log("Error in Mongo Session Store", err);
});


const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    },
};

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
    await mongoose.connect(dbUrl);
};


// <---------- ROUTES ---------->

// root directory
app.get("/", (req,res) => {
    res.redirect("/listings");
});

// session middlewares
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// define local variables
app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    res.locals.filterTag = filterTags;
    next();
});

// required paths
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


// <---------- ERROR HANDLING ---------->

app.all("*", (req,res,next) => {
    next(new ExpressError(404, "Page not found"));
});

app.use((err,req,res,next) => {
    let {status=500, message="Something Went Wrong"} = err;
    res.status(status).render("error.ejs", {err});
});


// <---------- SERVER ---------->

// start server
app.listen(port, () =>{
    console.log(`listening to port: ${port}`);
});