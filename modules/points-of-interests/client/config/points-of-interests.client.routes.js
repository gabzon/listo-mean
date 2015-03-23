'use strict';

//Setting up route
angular.module('points-of-interests').config(['$stateProvider',
	function($stateProvider) {
		// Points of interests state routing
		$stateProvider.
		state('points-of-interests', {
			abstract: true,
			url: '/points-of-interests',
			template: '<ui-view/>'
		}).
		state('points-of-interests.list', {
			url: '',
			templateUrl: 'modules/points-of-interests/views/list-points-of-interests.client.view.html'
		}).
		state('points-of-interests.create', {
			url: '/create',
			templateUrl: 'modules/points-of-interests/views/create-points-of-interest.client.view.html'
		}).
		state('points-of-interests.view', {
			url: '/:pointsOfInterestId',
			templateUrl: 'modules/points-of-interests/views/view-points-of-interest.client.view.html'
		}).
		state('points-of-interests.edit', {
			url: '/:pointsOfInterestId/edit',
			templateUrl: 'modules/points-of-interests/views/edit-points-of-interest.client.view.html'
		});
	}
]);