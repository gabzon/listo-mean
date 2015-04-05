'use strict';

//Setting up route
angular.module('places').config(['$stateProvider',
	function($stateProvider) {
		// Places state routing
		$stateProvider.
		state('places', {
			abstract: true,
			url: '/places',
			template: '<ui-view/>'
		}).
		state('places.list', {
			url: '',
			templateUrl: 'modules/places/views/list-places.client.view.html'
		}).
		state('places.create', {
			url: '/create',
			templateUrl: 'modules/places/views/create-place.client.view.html'
		}).
		state('places.view', {
			url: '/:placeId',
			templateUrl: 'modules/places/views/view-place.client.view.html'
		}).
		state('places.edit', {
			url: '/:placeId/edit',
			templateUrl: 'modules/places/views/edit-place.client.view.html'
		});
	}
]);