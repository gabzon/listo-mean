'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus','$mdSidenav',
function($scope, $state, Authentication, Menus, $mdSidenav) {
	// Expose view variables
	$scope.$state = $state;
	$scope.authentication = Authentication;

	$scope.listoLogo = 'img/brand/listo-logo.svg';

	$scope.toggleRight = function() {
		$mdSidenav('right').toggle();
	};

	// Get the topbar menu
	$scope.menu = Menus.getMenu('topbar');

	// Toggle the menu items
	$scope.isCollapsed = false;
	$scope.toggleCollapsibleMenu = function() {
		$scope.isCollapsed = !$scope.isCollapsed;
	};

	// Collapsing the menu after navigation
	$scope.$on('$stateChangeSuccess', function() {
		$scope.isCollapsed = false;
	});

	$scope.close = function() {
		$mdSidenav('right').toggle();
	};
}
]);
