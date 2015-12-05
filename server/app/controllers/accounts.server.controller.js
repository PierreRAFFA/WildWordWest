'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Account = mongoose.model('Account'),
    Score = mongoose.model('Score'),
    _ = require('lodash');


//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////Exposed for API
/**
 * Returns some info about the account
 * @param req
 * @param res
 */
exports.read = function (req, res) {

    var account = null;
    console.log(req.params);
    if (req.account)
    {
        account = req.account;
    }else{
        account = new Account(req.params);
        account.name = 'New Player';
    }

    res.json({
        uuid: account.uuid,
        name: account.name,
        scores: account.scores,
        level: account.level,
        balance: account.balance,
        selectedLocale: account.selectedLocale,
        weapons: account.weapons
    });
}

exports.getHighestTime = function (req, res) {

    if (req.params.hasOwnProperty('locale'))
    {
        var localeScoresField = 'scores.' + req.params.locale;

        var clauses = {};
        clauses[localeScoresField] = { $exists: true };
        console.log(clauses);

        var select = '-_id name ' + localeScoresField + '.highestTime';
        console.log(select);

        var sort = {};
        sort[localeScoresField + '.highestTime'] = -1;
        console.log(sort);

        Account
            .find(clauses)
            .select(select)
            .sort(sort)
            .limit(30)
            .exec(function(err, accounts) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {

                var json = [];
                _.forEach(accounts, function(account)
                {
                    json.push({
                        name: account.name,
                        highestTime:  account.scores[req.params.locale].highestTime
                    });
                });

                res.json(json);
            }
        });
    }else{
        res.json({});
    }

}


/**
 * Article middleware
 */
exports.accountByUUID = function(req, res, next, uuid) {
    Account.findByUUID(uuid).exec(function(err, account) {
        if (err) return next(err);
        //if (!account) return next(new Error('Failed to load account ' + uuid));
        req.account = account;
        next();
    });
};
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////// NOT Exposed for API
/**
 * Creates a new account
 *
 * @param params {uuid, name, email}
 * @param callback
 */
exports.create = function (params, callback)
{
    console.log('create');

    //check if an account with the same uuid was already created
    //@TODO check the name as well.
    Account.findByUUID(params.uuid).exec(function(err, account)
    {
        if (!account)
        {
            var newAccount = new Account(params);
            newAccount.save(function(err) {

                console.log('err');
                console.log(err);
                if (err) {
                    callback.call(null, false, errorHandler.getErrorMessage(err));
                } else {
                    callback.call(null, true);
                }
            });
        }
    });
}

/**
 * Saves the score, update some account fields and calls the callback with an update as Object
 *
 * @param params { uuid, locale, time, points }
 * @param callback
 */
exports.saveScore = function(params, callback)
{
    console.log('saveScore');
    console.log(params);
    Account.findByUUID(params.uuid).exec(function(err, account)
    {
        if (account)
        {
            console.log(account.scores);
            console.log(account.name);

            //create the result for the callback
            var result = {};
            result.highestTimeImproved = false;

            //create locale scores if not exists
            if (! account.scores[params.locale])
            {
                //to preserve default values of Score
                var newScore = new Score();

                account.scores[params.locale] = {
                    highestTime: newScore.highestTime,
                    highestWord: newScore.highestWord,
                    highestWordPoints: newScore.highestWordPoints,
                    totalPoints: newScore.totalPoints,
                }
            }

            //get localscore
            var localeScore = account.scores[params.locale];

            //update highestTime if necessary
            if ( localeScore.highestTime < params.time)
            {
                if (localeScore.highestTime > 0)
                {
                    result.highestTimeImproved = true;
                }
                localeScore.highestTime = params.time;
            }

            //update bestWordPoints/bestWord
            if ( localeScore.highestWordPoints < params.highestWordPoints)
            {
                if (localeScore.highestWordPoints > 0)
                {
                    result.highestWordPointsImproved = true;
                }
                localeScore.highestWordPoints = params.highestWordPoints;
                localeScore.highestWord = params.highestWord;
            }

            //update totalPoints
            account.scores[params.locale].totalPoints += params.points;

            //update balance
            var numCoinsWon = Math.round(params.points / 1000);
            account.balance += numCoinsWon;
            result.numCoinsWon = numCoinsWon;

            //update numGamesPlayed
            account.numGamesPlayed++;

            //update selectedLocale
            account.selectedLocale = params.locale;

            //update numGamesRemaining
            account.numGamesRemainingPerDay--;



            console.log('AFTER');
            console.log(account);

            //save
            account.save(function(err)
            {
                if (err)
                {
                    console.log('not saved');
                    result.success = false;
                    result.error = errorHandler.getErrorMessage(err);
                } else {
                    console.log('saved');
                    result.success = true;
                }

                console.log(result);
                callback.call(null, result);
            });
        }
    });
}