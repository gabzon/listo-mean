'use strict';

// Configuring the Travel agencies module
angular.module('travel-agencies').run(['Menus',
	function(Menus) {
		// Add the Travel agencies dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Travel agencies',
			state: 'travel-agencies',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'travel-agencies', {
			title: 'List Travel agencies',
			state: 'travel-agencies.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'travel-agencies', {
			title: 'Create Travel agency',
			state: 'travel-agencies.create'
		});
	}
]);