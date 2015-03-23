'use strict';

//Points of interests service used to communicate Points of interests REST endpoints
angular.module('points-of-interests').factory('PointsOfInterests', ['$resource',
	function($resource) {
		return $resource('api/points-of-interests/:pointsOfInterestId', { pointsOfInterestId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);