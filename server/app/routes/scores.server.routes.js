'use strict';

/**
 * Module dependencies.
 */
var scores = require('../../app/controllers/scores.server.controller');

module.exports = function(app)
{
	// Scores Routes
	app.route('/scores/:locale/:from')
		.get(scores.list);
		//.post(users.requiresLogin, scores.create);
};