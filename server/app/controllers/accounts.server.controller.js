'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Account = mongoose.model('Account'),
    Score2 = mongoose.model('Score2'),
    _ = require('lodash');


//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////Exposed for API
/**
 * Returns some info about the account
 * @param req
 * @param res
 */
exports.read = function (req, res) {

    if (req.account)
    {
        res.json({
            uuid: req.account.id,
            name: req.account.name,
            scores: req.account.scores,
            selectedLocale: req.account.selectedLocale
        });
    }else{
        res.json({});
    }
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
 *
 * @param params { uuid, locale, time }
 * @param callback
 */
exports.saveScore = function(params, callback)
{
    console.log('saveScore');
    Account.findByUUID(params.uuid).exec(function(err, account)
    {
        if (account)
        {
            console.log(account.scores);
            console.log(account.name);

            if (account.scores[params.locale])
            {
                //check if the time is better, then apply the new time
                var localeScore = account.scores[params.locale];
                if ( localeScore.highestTime < params.time)
                {
                    localeScore.highestTime = params.time;
                }
            }else{

                //to preserve default values of Score
                var newScore = new Score2();
                newScore.highestTime = params.time;

                account.scores[params.locale] = {
                    highestTime: newScore.highestTime,
                    highestWord: newScore.highestWord,
                    highestWordPoints: newScore.highestWordPoints,
                    totalPoints: newScore.totalPoints,
                }
            }

            console.log('AFTER');
            console.log(account);

            //save
            account.save(function(err) {
                if (err) {
                    console.log('not saved');
                    callback(null, false, errorHandler.getErrorMessage(err));
                } else {
                    console.log('saved');
                    callback(null, true);
                }
            });
        }
    });
}