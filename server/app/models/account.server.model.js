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
var ScoreSchema = new Schema({
    highestTime:        { type: Number, default: 0},
    highestWord:        { type: String, default: '' },
    highestWordPoints:  { type: Number, default: 0},
    totalPoints:        { type: Number, default: 0}
});
mongoose.model('Score', ScoreSchema);
/**
 * Account Schema
 * @type {mongoose.Schema}
 */
var AccountSchema = new Schema({
    uuid: String,
    name: String,
    email: String,
    numGamesPlayed: { type: Number, default: 0},
    selectedLocale: String,
    scores: {
        en_GB: ScoreSchema,
        fr_FR: ScoreSchema,
    },
    balance: { type: Number, default: 0},
    premium: Boolean,
    numGamesRemainingPerDay: { type: Number, default: 5},
});



AccountSchema.statics.findByUUID = function(uuid, callback)
{
    return this.findOne({uuid:uuid} , callback);
}
mongoose.model('Account', AccountSchema);

