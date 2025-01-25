const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const router = express.Router({mergeParams: true});
const reviewController = require("../controllers/review.js");

router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;