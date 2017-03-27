var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function (req, res) {

	//Parsing the longitude & latitude from the GET query into variables
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);

	// A geoJSON point
	var point = {
		type : "Point",
		coordinates : [lng, lat]
	};

	var geoOptions = {
		spherical : true,
		maxDistance : 2000,		//2000mts = 2kms
		num : 5
	};

	//Using 'Hotel' model
	Hotel
		.geoNear(point, geoOptions, function (err, results, stats) {

			if (err){
				console.log("Error finding hotel: "+err);
				res
					.status(500)
					.json(err);
			} else {
				console.log('Geo results', results);
				console.log('Geo stats', stats);
				//Responding with status code 200 and response in Json format
				res
					.status(200)
					.json(results);
			}
			
			
		});
};

//To fetch results for all Hotels
module.exports.hotelsGetAll = function (req, res) {
		var offset = 0;
		var count = 5;
		var maxCount = 10;

		//To check if longitude and latitude were passed in the GET query
		if(req.query && req.query.lng && req.query.lat ){
			runGeoQuery(req,res);
			return;
		}

		//To check if offset was passed in the GET query
		if(req.query && req.query.offset) {
			offset = parseInt(req.query.offset, 10);
		}
		//To check if count was passed in the GET query
		if(req.query && req.query.count) {
			count = parseInt(req.query.count, 10);
		}
		//To check if offset and count are numbers
		if(isNaN(offset) || isNaN(count)) {
			res
				.status(400)
				.json({
					"message" : "If supplied in querystring, Count and Offset should be numbers"
				});
			return;
		}

		if (count > maxCount) {
			res
				.status(400)
				.json({
					"message" : "Count limit of " + maxCount + " exceeded"
				});
			return;
		}

		//Using 'Hotel' model
		Hotel
			.find()
			.skip(offset)
			.limit(count)
			.exec(function (err, hotels) {
				if (err) {
					cosol.log("Error finding hotels");
					res
						.status(500)
						.json(err);
				} else {
				console.log("Found Hotels",hotels.length);
				//Responding with status code 200 and response in Json format
				res
					.status(200)
					.json(hotels);
				}
			});
	};

//To fetch results for a particular Hotel
module.exports.hotelsGetOne = function (req, res) {
		//Getting the Hotel Id parameter from the GET request
		var hotelId = req.params.hotelId;
		console.log('GET a particular hotel!');

		Hotel
			.findById(hotelId)
			.exec(function(err, doc){
				var response = {
					status : 200,
					message : doc
				};
				if (err) {
					console.log("Error finding hotel");
					response.status = 500;
					response.message = err;
				} else if (!doc) {
					response.status = 404;
					response.message = {
						"message" : "Hotel ID not found"
					};
				}
				res
					.status(response.status)
					.json(response.message);
			});
	};

//Function to split the array input for photos and services
var _splitArray = function(input){
	var output;
	if(input && input.length >0) {
		output = input.split(";");
	} else {
		output = [];
	}
	return output;
}

//To add a Hotel to the DB
module.exports.hotelsAddOne = function (req, res) {

		//Creating a new hotel variable
		var newHotel = {};
		console.log('POST a new hotel!');

		//To check if the POST request consists of a body, 'name' & 'stars' in the body
		if(req.body && req.body.name && req.body.stars){

			//Using Hotel model
			Hotel
				.create({
					name : req.body.name,
					//Convert the stars String into Int and insert in the newHotel
					stars : parseInt(req.body.stars, 10),
					description : req.body.description,
					currency : req.body.currency,
					photos : _splitArray(req.body.photos),
					services : _splitArray(req.body.photos),
					//Querying on the 'hotels' collection from the DB
					location : {
						address : req.body.address,
						coordinates : [
							parseFloat(req.body.lng),
							parseFloat(req.body.lat)
						]
					}
				}, function (err, response) {
					if (err) {
						console.log("Error adding hotels");
						res
							.status(400)		//bad request
							.json(err);
					} else {
						console.log(response);
						//Responding with status code 201 and response in Json format
						res
							.status(201)		//resource has been created
							.json(response);
					}
				});
		} else {
			console.log("Data missing from body");
			//Responding with status code 400 and an error in Json format 
			res
				.status(400)
				.json({ message : "Required data missing from body" });
		}
};

module.exports.hotelsUpdateOne = function (req, res) {
		//Getting the Hotel Id parameter from the GET request
		var hotelId = req.params.hotelId;
		console.log('GET a particular hotel!');

		Hotel
			.findById(hotelId)
			//To exclude reviews and rooms in the returned model
			.select("-reviews -rooms")
			.exec(function(err, doc){
				var response = {
					status : 200,
					message : doc
				};
				if (err) {
					console.log("Error finding hotel");
					response.status = 500;
					response.message = err;
				} else if (!doc) {
					response.status = 404;
					response.message = {
						"message" : "Hotel ID not found"
					};
				}

				if(response.status !== 200){
					res
						.status(response.status)
						.json(response.message);
				} else {
					doc.name = req.body.name;
					//Convert the stars String into Int and insert in the newHotel
					doc.stars = parseInt(req.body.stars, 10);
					doc.description = req.body.description;
					doc.currency = req.body.currency;
					doc.photos = _splitArray(req.body.photos);
					doc.services = _splitArray(req.body.photos);
					//Querying on the 'hotels' collection from the DB
					doc.location = {
						address : req.body.address,
						coordinates : [
							parseFloat(req.body.lng),
							parseFloat(req.body.lat)
						]
					}
					doc.save(function (err, hotelUpdated) {
						if(err) {
							res
								.status(500)
								.json(err);
						} else {
							res
								.status(204) //content updated with empty response returned
								.json();
						}
					})	
				}
			});
}

module.exports.hotelsDeleteOne = function (req, res) {
		//Getting the Hotel Id parameter from the GET request
		var hotelId = req.params.hotelId;
		console.log('GET a particular hotel!');

		Hotel
			.findByIdAndRemove(hotelId)
			.exec(function (err, hotel) {
				if(err){
					res
						.status(404)
						.json(err);
				} else {
					console.log("Hotel deleted, id: ", hotelId);
					res
						.status(204)
						.json();
				}
				
			});
}





