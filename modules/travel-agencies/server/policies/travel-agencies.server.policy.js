'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Travel agencies Permissions
 */
exports.invokeRolesPolicies = function() {
	acl.allow([{
		roles: ['admin'],
		allows: [{
			resources: '/api/travel-agencies',
			permissions: '*'
		}, {
			resources: '/api/travel-agencies/:travelAgencyId',
			permissions: '*'
		}, {
			resources: '/api/travel-agencies/:travelAgencyId/logo/upload',
			permissions: ['post']
		}]
	}, {
		roles: ['user'],
		allows: [{
			resources: '/api/travel-agencies',
			permissions: ['get', 'post']
		}, {
			resources: '/api/travel-agencies/:travelAgencyId',
			permissions: ['get']
		}]
	}, {
		roles: ['guest'],
		allows: [{
			resources: '/api/travel-agencies',
			permissions: ['get']
		}, {
			resources: '/api/travel-agencies/:travelAgencyId',
			permissions: ['get']
		}]
	}]);
};

/**
 * Check If Articles Policy Allows
 */
exports.isAllowed = function(req, res, next) {
	var roles = (req.user) ? req.user.roles : ['guest'];

	// If an travelAgency is being processed and the current user created it then allow any manipulation
	if (req.travelAgency && req.user && req.travelAgency.user.id === req.user.id) {
		return next();
	}

	// Check for user roles
	acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function(err, isAllowed) {
		if (err) {
			// An authorization error occurred.
			return res.status(500).send('Unexpected authorization error');
		} else {
			if (isAllowed) {
				// Access granted! Invoke next middleware
				return next();
			} else {
				return res.status(403).json({
					message: 'User is not authorized'
				});
			}
		}
	});
};
