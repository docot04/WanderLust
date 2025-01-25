// <-------- DEFINE SCHEMA FOR ALL LISTINGS ---------->

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const filterTags = require("./filters.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    image: {
        url: String,
        filename: String,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    location: {
        type: String,
        required: true,
        trim: true,
    },

    country: {
        type: String,
        required: true,
        trim: true,
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    filter: {
        type: [String],
        enum: Object.keys(filterTags),
    }

});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if (listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;