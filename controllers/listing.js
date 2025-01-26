const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const filterTags = require("../models/filters.js");

// regex function
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// index
module.exports.index = async (req, res) => {
    let allListings, regex;
    const searchquery = req.query.search;
    // fuzzy search
    if (searchquery) {
        regex = new RegExp(escapeRegex(searchquery), "gi");
        allListings = await Listing.find({
            $or: [
                {title: regex}, {description: regex}, {location: regex}, {country: regex}, {filter: regex}
            ]
        }).populate('reviews');
    } else {
        searched = false;
        allListings = await Listing.find({}).populate('reviews');
    }
    // calculate average ratings
    const listingsWithAverageRating = allListings.map(listing => {
        if (listing.reviews.length > 0) {
            const totalRatingSum = listing.reviews.reduce((sum, review) => {
                return sum + (typeof review.rating === 'number' ? review.rating : 0);
            }, 0);
            const averageRating = (totalRatingSum / listing.reviews.length).toFixed(2);
            return { ...listing.toObject(), averageRating: averageRating || 0 };
        } else {
            return {...listing.toObject(),averageRating: 0};
        }
    });
    res.render("listings/index.ejs", { allListings: listingsWithAverageRating, searchquery});
};

// filter
module.exports.filterSearch = async (req, res) => {
    const tag = req.params.tag;
    if(!filterTags[tag]){
        req.flash("error", "Invalid filter tag");
        return res.redirect("/listings");
    }
    const taggedListings = await Listing.find({ filter: { $in: [tag] } }).populate('reviews');
    const listingsWithAverageRating = taggedListings.map(listing => {
        if (listing.reviews.length > 0) {
            const totalRatingSum = listing.reviews.reduce((sum, review) => {
                return sum + (typeof review.rating === 'number' ? review.rating : 0);
            }, 0);
            const averageRating = (totalRatingSum / listing.reviews.length).toFixed(2);
            return { ...listing.toObject(), averageRating: averageRating || 0 };
        } else {
            return { ...listing.toObject(), averageRating: 0 };
        }
    });
    res.render("listings/index.ejs", { tag, taggedListings: listingsWithAverageRating });
}


// new form
module.exports.renderNewForm = (req,res) => {
    res.render("listings/new.ejs");
}

// create
module.exports.createListing = async(req,res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

// show
module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner"); // nested populate
    if(!listing){
        req.flash("error", "Listing does not exist");
        res.redirect("/listings");
    } else {
        res.render("listings/show.ejs",{listing});
    }
}

// edit form
module.exports.renderEditForm = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
}

// update
module.exports.updateListing = async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

// delete
module.exports.destroyListing = async (req,res)=> {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};


// my listings
module.exports.my = async (req,res) => {
    let {userId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(userId)){
        req.flash("error", "Invalid user ID");
        res.redirect("/listings");
    }
    const owner = await User.findById(userId);
    if(!owner){
        req.flash("error", "User does not exist!");
        res.redirect("/listings");
    } else {
    const myListings = await Listing.find({owner: new mongoose.Types.ObjectId(userId)}).populate("reviews");
    // calculate average ratings
    const listingsWithAverageRating = myListings.map(listing => {
        if(listing.reviews.length > 0) {
            const totalRatingSum = listing.reviews.reduce((sum,review)=>{
                return sum + (typeof review.rating === "number"?review.rating:0);
            }, 0);
            const averageRating = (totalRatingSum / listing.reviews.length).toFixed(2);
            return {...listing.toObject(), averageRating: averageRating || 0};
        } else {
            return {...listing.toObject(),averageRating:0};
        }
    })
    // aggregate statistics for all listings
    const userIdObjectId = new mongoose.Types.ObjectId(userId);
    const listingsData = await Listing.aggregate([
        {$match: { owner: userIdObjectId }},
        {$lookup: {from: 'reviews', localField: 'reviews', foreignField: '_id', as: 'reviews'}},
        {$unwind: { path: '$reviews', preserveNullAndEmptyArrays: true }},
        {$group: {_id: null, totalReviews: { $sum: { $cond: [{ $ifNull: ['$reviews', false] }, 1, 0] } }, totalRatingSum: { $sum: '$reviews.rating' }}}
    ]);
    let totalListings = 0;
    let totalReviews = 0;
    let totalRatingSum = 0;
    if (listingsData.length > 0) {
        totalListings = await Listing.countDocuments({ owner: userIdObjectId });
        totalReviews = listingsData[0].totalReviews;
        totalRatingSum = listingsData[0].totalRatingSum;
    }
    const averageRating = totalReviews > 0 ? (totalRatingSum / totalReviews).toFixed(2) : 0;
    res.render("listings/my.ejs", { myListings: listingsWithAverageRating, owner, totalListings, totalReviews, averageRating });
    }
};