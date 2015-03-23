'use strict';

//Setting up route
angular.module('voyages').config(['$stateProvider',
	function($stateProvider) {
		// Voyages state routing
		$stateProvider.
		state('voyages', {
			abstract: true,
			url: '/voyages',
			template: '<ui-view/>'
		}).
		state('voyages.list', {
			url: '',
			templateUrl: 'modules/voyages/views/list-voyages.client.view.html'
		}).
		state('voyages.create', {
			url: '/create',
			templateUrl: 'modules/voyages/views/create-voyage.client.view.html'
		}).
		state('voyages.view', {
			url: '/:voyageId',
			templateUrl: 'modules/voyages/views/view-voyage.client.view.html'
		}).
		state('voyages.edit', {
			url: '/:voyageId/edit',
			templateUrl: 'modules/voyages/views/edit-voyage.client.view.html'
		});
	}
]);