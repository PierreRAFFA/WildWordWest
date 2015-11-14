'use strict';

/**
 * Module dependencies.
 */
var scoresController = require('../../app/controllers/scores.server.controller');

module.exports = function(app)
{
	// Scores Routes
	app.route('/scores/:locale/:from')
		.get(scoresController.list);
		//.post(users.requiresLogin, scores.create);
        //.get(function(req,res){
         //   res.json({ok:3});
        //})
};