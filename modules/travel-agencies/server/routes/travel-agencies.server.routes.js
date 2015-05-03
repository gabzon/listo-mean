'use strict';

module.exports = function(app) {
	var travelAgencies = require('../controllers/travel-agencies.server.controller');
	var travelAgenciesPolicy = require('../policies/travel-agencies.server.policy');

	// Travel agencies Routes
	app.route('/api/travel-agencies').all()
		.get(travelAgencies.list).all(travelAgenciesPolicy.isAllowed)
		.post(travelAgencies.create);

	 app.route('/api/travel-agencies/count')
	 	.get(travelAgencies.count).all(travelAgenciesPolicy.isAllowed);

	app.route('/api/travel-agencies/:travelAgencyId').all(travelAgenciesPolicy.isAllowed)
		.get(travelAgencies.read)
		.put(travelAgencies.update)
		.delete(travelAgencies.delete);

	// Finish by binding the Travel agency middleware
	app.param('travelAgencyId', travelAgencies.travelAgencyByID);

};
