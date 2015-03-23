'use strict';

module.exports = function(app) {
	var places = require('../controllers/places.server.controller');
	var placesPolicy = require('../policies/places.server.policy');

	// Places Routes
	app.route('/api/places').all()
		.get(places.list).all(placesPolicy.isAllowed)
		.post(places.create);

	app.route('/api/places/:placeId').all(placesPolicy.isAllowed)
		.get(places.read)
		.put(places.update)
		.delete(places.delete);

	// Finish by binding the Place middleware
	app.param('placeId', places.placeByID);
};