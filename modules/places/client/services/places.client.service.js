'use strict';

//Places service used to communicate Places REST endpoints
angular.module('places').factory('Places', ['$resource',
	function($resource) {
		return $resource('api/places/:placeId', { placeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);