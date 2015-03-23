'use strict';

//Setting up route
angular.module('travel-agencies').config(['$stateProvider',
	function($stateProvider) {
		// Travel agencies state routing
		$stateProvider.
		state('travel-agencies', {
			abstract: true,
			url: '/travel-agencies',
			template: '<ui-view/>'
		}).
		state('travel-agencies.list', {
			url: '',
			templateUrl: 'modules/travel-agencies/views/list-travel-agencies.client.view.html'
		}).
		state('travel-agencies.create', {
			url: '/create',
			templateUrl: 'modules/travel-agencies/views/create-travel-agency.client.view.html'
		}).
		state('travel-agencies.view', {
			url: '/:travelAgencyId',
			templateUrl: 'modules/travel-agencies/views/view-travel-agency.client.view.html'
		}).
		state('travel-agencies.edit', {
			url: '/:travelAgencyId/edit',
			templateUrl: 'modules/travel-agencies/views/edit-travel-agency.client.view.html'
		});
	}
]);