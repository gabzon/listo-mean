'use strict';

angular.module('core').controller('SidenavController', ['$scope', '$state', 'Authentication', 'Menus','$mdSidenav',
function($scope, $state, Authentication, Menus, $mdSidenav) {
	// Expose view variables
	$scope.$state = $state;
	$scope.authentication = Authentication;

	$scope.toggleRight = function() {
		$mdSidenav('right').toggle();
	};

	$scope.close = function() {
		$mdSidenav('right').toggle();
	};
}
]);
