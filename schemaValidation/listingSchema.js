const Joi = require("joi");
const filterTags = require("../models/filters.js");

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null),
        filter: Joi.array().items(Joi.string().valid(...Object.keys(filterTags))) 
    }).required()
})