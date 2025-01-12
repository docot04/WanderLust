// <-------- DEFINE SCHEMA FOR ALL LISTINGS ---------->

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const defaultImg = "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    image: {
        type: String,
        trim: true,
        default: defaultImg,
        set: (v) => v===""?defaultImg:v,
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

});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;