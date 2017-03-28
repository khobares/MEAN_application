var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/review.controllers.js');

//Routing requests for hotels
router
	.route('/hotels')
	.get(ctrlHotels.hotelsGetAll)
	.post(ctrlHotels.hotelsAddOne);

router
	.route('/hotels/:hotelId')
	.get(ctrlHotels.hotelsGetOne)
	.put(ctrlHotels.hotelsUpdateOne)
	.delete(ctrlHotels.hotelsDeleteOne);


//Routing requests for reviews
router
	.route('/hotels/:hotelId/reviews')
	.get(ctrlReviews.reviewsGetAll)
	.post(ctrlReviews.reviewsAddOne);

router
	.route('/hotels/:hotelId/reviews/:reviewId')
	.get(ctrlReviews.reviewsGetOne)
	.put(ctrlReviews.reviewsUpdateOne)
	.delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;