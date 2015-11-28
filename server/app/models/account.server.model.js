'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var AccountSchema = new Schema({
	uuid: String,
	name: String,
	email: String,
	numGames: Number,
	selectedLocale: String,
	scores: {
		locale: String,
		bestTime: Number,
		bestWord: String,
		bestWordPoints: Number
	},
	premium: Boolean,
	numGamesRemaining: Number
});

mongoose.model('Account', AccountSchema);