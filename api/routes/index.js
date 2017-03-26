var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/review.controllers.js');

//Routing GET requests for hotels
router
	.route('/hotels')
	.get(ctrlHotels.hotelsGetAll);

router
	.route('/hotels/:hotelId')
	.get(ctrlHotels.hotelsGetOne);


//Routing POST requests for hotels
router
	.route('/hotels/new')
	.post(ctrlHotels.hotelsAddOne);

//Routing GET requests for reviews
router
	.route('/hotels/:hotelId/reviews')
	.get(ctrlReviews.reviewsGetAll);

router
	.route('/hotels/:hotelId/reviews/:reviewId')
	.get(ctrlReviews.reviewsGetOne);

module.exports = router;