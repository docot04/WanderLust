const User = require("../models/user.js");

// signup form
module.exports.renderSignUpForm = (req,res) => {
    res.render("users/signup.ejs");
}

// create
module.exports.signup = async(req,res)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        })
    } catch(err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

// login form
module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
}

// login
module.exports.login = async(req,res) => {
    req.flash("success", "Welcome Back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

// logout
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Logged Out");
        res.redirect("/listings");
    })
}