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
			console.log('Geo results', results);
			console.log('Geo stats', stats);
			//Responding with status code 200 and response in Json format
			res
				.status(200)
				.json(results);
		});
};

//To fetch results for all Hotels
module.exports.hotelsGetAll = function (req, res) {
		var offset = 0;
		var count = 5;

		//To check if latitude and longitude were passed in the GET query
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

		//Using 'Hotel' model
		Hotel
			.find()
			.skip(offset)
			.limit(count)
			.exec(function (err, hotels) {
				console.log("Found Hotels",hotels.length);
				//Responding with status code 200 and response in Json format
				res
					.status(200)
					.json(hotels);
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
				res
					.status(200)
					.json(doc);
			});
	};

//To add a Hotel to the DB
module.exports.hotelsAddOne = function (req, res) {

		//Creating a new hotel variable
		var newHotel;
		console.log('POST a new hotel!');

		//To check if the POST request consists of a body, 'name' & 'stars' in the body
		if(req.body && req.body.name && req.body.stars){
			//insert the body of the POST request in the newHotel
			newHotel = req.body;
			//Convert the stars String into Int and insert in the newHotel
			newHotel.stars = parseInt(req.body.stars, 10);
			//Querying on the 'hotels' collection from the DB
			
			//Using Hotel model
			Hotel
				.create(newHotel, function (err, response) {
					console.log(response);
					//Responding with status code 201 and response in Json format
					res
						.status(201)
						.json(response);

				});
		} else {
			console.log("Data missing from body");
			//Responding with status code 400 and an error in Json format 
			res
				.status(400)
				.json({ message : "Required data missing from body" });
		}
	};
