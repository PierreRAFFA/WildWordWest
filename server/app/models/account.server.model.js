'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Score Schema
 * @type {mongoose.Schema}
 */
var Score2Schema = new Schema({
    highestTime:        { type: Number, default: 0},
    highestWord:        { type: String, default: '' },
    highestWordPoints:  { type: Number, default: 0},
    totalPoints:        { type: Number, default: 0}
});
mongoose.model('Score2', Score2Schema);
/**
 * Account Schema
 * @type {mongoose.Schema}
 */
var AccountSchema = new Schema({
    uuid: String,
    name: String,
    email: String,
    numGames: Number,
    selectedLocale: String,
    scores: {
        en_GB: Score2Schema,
        fr_FR: Score2Schema,
    },
    premium: Boolean,
    numGamesRemaining: Number
});



AccountSchema.statics.findByUUID = function(uuid, callback)
{
    return this.findOne({uuid:uuid} , callback);
}
mongoose.model('Account', AccountSchema);

