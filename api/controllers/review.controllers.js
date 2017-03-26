var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

//GET all reviews for a hotel
module.exports.reviewsGetAll = function (req, res) {
	
	//Getting the Hotel Id parameter from the GET request
	var hotelId = req.params.hotelId;
	console.log('GET hotelID ', hotelId);

	//Using 'Hotel' model
	Hotel
		.findById(hotelId)
		.select('reviews')
		.exec(function(err, doc){
			console.log("Returned doc", doc)
			//Responding with status code 200 and response in Json format
			res
				.status(200)
				.json(doc.reviews);
		});
}

//GET single review for a hotel
module.exports.reviewsGetOne = function (req, res) {
	
	//Getting the HotelId & ReviewId parameters from the GET request
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log('GET reviewID'+reviewId+' for hotelID'+hotelId);

	//Using 'Hotel' model
	Hotel
		.findById(hotelId)
		.select('reviews')
		.exec(function(err, hotel){
			console.log("Returned hotel", hotel);
			//Using reviewID to find a specific review
			var review = hotel.reviews.id(reviewId);
			//Responding with status code 200 and response in Json format
			res
				.status(200)
				.json(review);
		});
};