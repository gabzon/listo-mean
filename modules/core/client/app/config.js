'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'Listo Voyage';

	var applicationModuleVendorDependencies = ['ngResource', 'ui.router', 'ui.bootstrap', 'ui.utils', 'angularFileUpload','ngMaterial', 'uiGmapgoogle-maps'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || [])
			.config(function($mdThemingProvider) {
				$mdThemingProvider.theme('default')
					.primaryPalette('deep-purple')
					.accentPalette('pink')
					.warnPalette('red');
			}
		);

	// Add the module to the AngularJS configuration file
	angular.module(applicationModuleName).requires.push(moduleName);
};

return {
	applicationModuleName: applicationModuleName,
	applicationModuleVendorDependencies: applicationModuleVendorDependencies,
	registerModule: registerModule
};
})();
