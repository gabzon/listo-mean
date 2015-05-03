'use strict';

//Travel agencies service used to communicate Travel agencies REST endpoints
angular.module('travel-agencies').factory('TravelAgencies', ['$resource',
	function($resource) {
		return $resource('api/travel-agencies/:travelAgencyId',
		{ travelAgencyId: '@_id'},
		{
			update: {
				method: 'PUT'
			}
		});
	}
]);
