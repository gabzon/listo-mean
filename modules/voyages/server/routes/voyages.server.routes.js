'use strict';

module.exports = function(app) {
	var voyages = require('../controllers/voyages.server.controller');
	var voyagesPolicy = require('../policies/voyages.server.policy');

	// Voyages Routes
	app.route('/api/voyages').all()
		.get(voyages.list).all(voyagesPolicy.isAllowed)
		.post(voyages.create);

	app.route('/api/voyages/:voyageId').all(voyagesPolicy.isAllowed)
		.get(voyages.read)
		.put(voyages.update)
		.delete(voyages.delete);

	// Finish by binding the Voyage middleware
	app.param('voyageId', voyages.voyageByID);
};