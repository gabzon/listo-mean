'use strict';

// Configuring the Places module
angular.module('places').run(['Menus',
	function(Menus) {
		// Add the Places dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Places',
			state: 'places',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'places', {
			title: 'List Places',
			state: 'places.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'places', {
			title: 'Create Place',
			state: 'places.create'
		});
	}
]);