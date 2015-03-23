'use strict';

// Configuring the Voyages module
angular.module('voyages').run(['Menus',
	function(Menus) {
		// Add the Voyages dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Voyages',
			state: 'voyages',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'voyages', {
			title: 'List Voyages',
			state: 'voyages.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'voyages', {
			title: 'Create Voyage',
			state: 'voyages.create'
		});
	}
]);