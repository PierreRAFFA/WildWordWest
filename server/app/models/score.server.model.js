'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ScoreSchema = new Schema({
    value: Number,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    locale:String
});

mongoose.model('Score', ScoreSchema);