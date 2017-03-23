var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controller.js');

//Routing GET requests
router
	.route('/hotels')
	.get(ctrlHotels.hotelsGetAll);

router
	.route('/hotels/:hotelId')
	.get(ctrlHotels.hotelsGetOne);

//Routing POST requests
router
	.route('/hotels/new')
	.post(ctrlHotels.hotelsAddOne);

module.exports = router;