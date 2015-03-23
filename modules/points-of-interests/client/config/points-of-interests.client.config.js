'use strict';

// Configuring the Points of interests module
angular.module('points-of-interests').run(['Menus',
	function(Menus) {
		// Add the Points of interests dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Points of interests',
			state: 'points-of-interests',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'points-of-interests', {
			title: 'List Points of interests',
			state: 'points-of-interests.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'points-of-interests', {
			title: 'Create Points of interest',
			state: 'points-of-interests.create'
		});
	}
]);