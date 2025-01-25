const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateListing, isLoggedIn, isOwner} = require("../middleware.js");
const router = express.Router();
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing)); 

router.get("/new", isLoggedIn, listingController.renderNewForm);

router.get("/filter/tag/:tag", wrapAsync(listingController.filterSearch));

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm)); 

router.route("/user/:userId")
    .get(wrapAsync(listingController.my))

module.exports = router;