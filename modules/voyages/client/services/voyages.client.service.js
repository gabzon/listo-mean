'use strict';

//Voyages service used to communicate Voyages REST endpoints
angular.module('voyages').factory('Voyages', ['$resource',
	function($resource) {
		return $resource('api/voyages/:voyageId', { voyageId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);