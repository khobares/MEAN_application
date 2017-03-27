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
		// .select('reviews')
		.exec(function(err, doc){
			var response = {
				status : 200,
				message : doc
				};
			if (err) {
				console.log("err : Error finding hotel");
				response.status = 500;
				response.message = err;

			} else if (!doc){
				console.log("Hotel not found");
				response.status = 400;
				response.message = {"error" : "Hotel not found"};

			} else if (doc.reviews.length === 0) {
				console.log("No reviews found for this hotel");
				response.status = 404;
				response.message = { "message" : "No reviews found for this hotel"};
			
			} else {
				console.log("Found reviews for hotel with hotelId: "+hotelId);
				response.message = doc.reviews;
			}
			//Responding with status code 200 and response in Json format
			res
				.status(response.status)
				.json(response.message);
		});
};

//GET single review for a hotel
module.exports.reviewsGetOne = function (req, res) {
	
	//Getting the HotelId & ReviewId parameters from the GET request
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log('GET reviewID '+reviewId+' for hotelID '+hotelId);

	//Using 'Hotel' model
	Hotel
		.findById(hotelId)
		// .select('reviews')
		.exec(function(err, doc){
			var response = {
				status : 200,
				message : doc
			};
			if (err) {
				console.log("err : Error finding hotel");
				response.status = 500;
				response.message = err;

			} else if (!doc){
				console.log("Hotel not found");
				response.status = 404;
				response.message = {"error" : "Hotel not found"};

			} else {
				var aReview = doc.reviews.id(reviewId);
				if (!aReview) {
					console.log("Invalid Review Id");
					response.status = 500;
					response.message = { "error" : "Review Id not found"};
				} else {
					console.log("Found review of reviewId: "+ reviewId + " for hotel: " + hotelId);
					console.log("Found the review: " + aReview);
					response.message = aReview;
				}
			}
			//Responding with status code 200 and response in Json format
			res
				.status(response.status)
				.json(response.message);
			// console.log("Returned hotel", hotel);
			// //Using reviewID to find a specific review
			// var review = hotel.reviews.id(reviewId);
			// //Responding with status code 200 and response in Json format
			// res
			// 	.status(200)
			// 	.json(review);
		});
};

var _addReview = function(req, res, hotel) {

	hotel.reviews.push({
		name : req.body.name,
		rating : parseInt(req.body.rating, 10),
		review : req.body.review
	});

	hotel.save(function (err, hotelUpdated) {
		if(err) {
			res
				.status(500)
				.json(err);
		} else {
			console.log("The review has been added: ", hotelUpdated.reviews[ hotelUpdated.reviews.length - 1 ]);
			res
				.status(201)
				.json(hotelUpdated.reviews[ hotelUpdated.reviews.length - 1 ]);
		}
	});
};

module.exports.reviewsAddOne = function (req,res) {

	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log('POST review for hotelID '+hotelId);

	//Using 'Hotel' model
	Hotel
		.findById(hotelId)
		// .select('reviews')
		.exec(function(err, doc){
			var response = {
				status : 200,
				message : doc
			};
			if (err) {
				console.log("err : Error finding hotel");
				response.status = 500;
				response.message = err;

			} else if (!doc){
				console.log("Hotel not found");
				response.status = 404;
				response.message = {"error" : "Hotel not found"};
			};

			if(doc) {
				_addReview(req, res, doc);
			} else {
				res
					.status(response.status)
					.json(response.message);
			}
			//Responding with status code 200 and response in Json format
			// console.log("Returned hotel", hotel);
			// //Using reviewID to find a specific review
			// var review = hotel.reviews.id(reviewId);
			// //Responding with status code 200 and response in Json format
			// res
			// 	.status(200)
			// 	.json(review);
		});
};

module.exports.reviewsUpdateOne = function (req, res) {
	//Getting the HotelId & ReviewId parameters from the GET request
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log('GET reviewID '+reviewId+' for hotelID '+hotelId);

	//Using 'Hotel' model
	Hotel
		.findById(hotelId)
		// .select('reviews')
		.exec(function(err, doc){
			var response = {
				status : 204
			};
			if (err) {
				console.log("err : Error finding hotel");
				response.status = 500;
				response.message = err;

			} else if (!doc){
				console.log("Hotel not found");
				response.status = 404;
				response.message = {"error" : "Hotel not found"};

			} else {
				var aReview = doc.reviews.id(reviewId);
				if (!aReview) {
					console.log("Invalid Review Id");
					response.status = 500;
					response.message = { "error" : "Review Id not found"};
				} else {
					console.log("Found review of reviewId: "+ reviewId + " for hotel: " + hotelId);
					console.log("Found the review: " + aReview);

					response.status = 204;
					response.message = doc;

					aReview.name = req.body.name;
					aReview.rating = req.body.rating;
					aReview.review = req.body.rating;

					doc.save(function (err, hotelUpdated) {
						if(err) {
							response.status = 500;
							response.message = err;
						} else {
							response.status = 204;
						}
					})	
					// response.message = aReview;
				}
				res
				.status(response.status)
				.json(response.message);
			}
		});	
}

module.exports.reviewsDeleteOne = function (req, res) {
	//Getting the HotelId & ReviewId parameters from the GET request
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log('GET reviewID '+reviewId+' for hotelID '+hotelId);

	//Using 'Hotel' model
	Hotel
		.findById(hotelId)
		// .select('reviews')
		.exec(function(err, doc){
			var response = {
				status : 204
			};
			if (err) {
				console.log("err : Error finding hotel");
				response.status = 500;
				response.message = err;

			} else if (!doc){
				console.log("Hotel not found");
				response.status = 404;
				response.message = {"error" : "Hotel not found"};

			} else {
				var aReview = doc.reviews.id(reviewId);
				if (!aReview) {
					console.log("Invalid Review Id");
					response.status = 500;
					response.message = { "error" : "Review Id not found"};
				} else {
					console.log("Found review of reviewId: "+ reviewId + " for hotel: " + hotelId);
					console.log("Found the review: " + aReview);

					response.status = 204;
					response.message = doc;


					doc.reviews.id(reviewId).remove();

					doc.save(function (err, hotelUpdated) {
						if(err) {
							response.status = 500;
							response.message = err;
						} else {
							console.log("Review deleted, id: ", reviewId);
							response.status = 204;
						}
					})
				}
				res
				.status(response.status)
				.json(response.message);
			}
		});	
}



