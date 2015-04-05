'use strict';

module.exports = function(app) {
	var pointsOfInterests = require('../controllers/points-of-interests.server.controller');
	var pointsOfInterestsPolicy = require('../policies/points-of-interests.server.policy');

	// Points of interests Routes
	app.route('/api/points-of-interests').all()
		.get(pointsOfInterests.list).all(pointsOfInterestsPolicy.isAllowed)
		.post(pointsOfInterests.create);

	app.route('/api/points-of-interests/:pointsOfInterestId').all(pointsOfInterestsPolicy.isAllowed)
		.get(pointsOfInterests.read)
		.put(pointsOfInterests.update)
		.delete(pointsOfInterests.delete);

	// Finish by binding the Points of interest middleware
	app.param('pointsOfInterestId', pointsOfInterests.pointsOfInterestByID);
};