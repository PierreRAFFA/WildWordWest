var events      = require('events');
var EventEmitter = require('events').EventEmitter;

var mongoose    = require('mongoose');
//var Account     = require('../models/account');
//var Score       = require('../models/score');

/**
 * Module exports.
 */


////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/**
 * Board constructor.
 *
 * @param {locale}
 * @param {numColumns}
 * @param {numRows}
 */
function Dal()
{
    if (!(this instanceof Dal)) return new Dal();

    EventEmitter.call(this);

    /**
     * MongoDB Connected ?
     * @type {boolean}
     */
    this.mConnected = false;

    //this.connectToDatabase();

    this.rand = Math.random();

    return this;
}
// inherit events.EventEmitter
Dal.prototype = Object.create(EventEmitter.prototype);
//util.inherits(Dal, EventEmitter);
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/**
 * Connect to mongoDB
 *
 */
Dal.prototype.connectToDatabase = function()
{
    console.log("connectToDatabase");
    var self = this;
    var db = mongoose.connection;
    if ( db.readyState == false)
    {
        //db.on('error', console.error.bind(console, 'connection error:'));

        mongoose.connect('mongodb://localhost:27017/wildwordwest', function(err) {
            if (err) { throw "Mongodb Error: "+err; }

            self.mConnected = true;
            self.emit("databaseConnected");
        });
    }
}

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////  LOAD LETTER FREQUENCY
/**
 * Load Alphabet with correct letter frequency depending on the locale
 *
 * @param {locale}
 */
Dal.prototype.getLetterFrequency = function(locale)
{
    var self = this;
    var lLetterFrequency = [];

    var Letter = require("../models/letter")(locale);
    Letter.find(function (err, letters)
    {
        console.log(letters.length);
        for(var iL = 0 ; iL < letters.length ; iL++)
        {
            var lLetter = letters[iL];
            lLetterFrequency[lLetter["letter"]] = lLetter["frequency"];
        }

        self.emit("letterFrequencyLoadComplete" , lLetterFrequency);
    })

}
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////  SELECT WORD
/**
 * Returns words ( used to check if word exists )
 *
 * @param {word} String
 */
Dal.prototype.selectWord = function(word , locale)
{
    var self = this;
    var lIsWordExist = false;

    var Word = require("../models/word")(locale);
    Word.find({cleanedWord:word}, function (err, words)
    {
        console.log("numWords:"+words.length);
        self.emit("wordLoadComplete" , words.length > 0);

        //@HARDCODE to always valid words.
        //self.emit("wordLoadComplete" , true);
    })
}

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////  GET ACCOUNT
/**
 *
 * @param name
 * @param password
 */
Dal.prototype.getAccount = function(name,password)
{
    var self = this;

    Account.find({name:name , password:password},
        function (err, accounts)
        {
            console.log("numUsers:"+accounts.length);
            self.emit("usersLoadComplete" , accounts);
        }
    );
}
Dal.prototype.getAccountTopScore = function(username,locale)
{
    var self = this;

    console.log("getAccountTopScore");
    console.log("locale:"+locale);
    console.log("username:"+username);

    var lClauses = {};
    lClauses.username = username;

    console.log(lClauses);

    Account.find(lClauses,
        function (err, accounts)
        {
            console.log("numAccounts:"+accounts.length);

            var lTopScoreValue = null;

            if ( accounts.length == 1) {
                var lAccount = accounts[0];
                var lLocaleTopScore = lAccount.topScores[locale];
                console.log(lLocaleTopScore);

                lTopScoreValue = lLocaleTopScore.value;
            }
            self.emit("accountTopScoreLoadComplete" , lTopScoreValue);
        }
    );
}
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////   GET RANK
/**
 * Get Rank from score value
 * @param scoreValue
 */
Dal.prototype.getRank = function(scoreValue,locale)
{
    console.log("getRank");

    var self = this;

    var lClauses = {};
    lClauses["topScores." + locale + ".value"] = {$gt:scoreValue};

    Account.find(lClauses).count(function(err,count)
        {
            if (err) return "--";

            self.emit("rankComplete" , count + 1);
        });
}
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////   JOIN
Dal.prototype.join = function(params)
{
    console.log("join");
    console.log(params);

    var self = this;
    Account.register(new Account({ username : params.username }), params.password, function(err, account) {
        if (err)
        {
            console.log(err);
            self.emit("joinComplete" , false , err);
        }

        self.emit("joinComplete" , true);
    });
}
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////  GET SCORES FROM LOCALE
Dal.prototype.getScores = function(locale,from)
{
    from = from || 0;
    var limit = 15;

    var self = this;

    var lLocalTopScoreKey = 'topScores.' + locale + '.value';

    var lClauses = {};
    lClauses["topScores."+locale] = { $exists:true};
    lClauses[lLocalTopScoreKey] = { $gt:0};

    var lSort = {};
    lSort[lLocalTopScoreKey] = -1;

    Account
        .find(lClauses,
        '-_id username ' + lLocalTopScoreKey,
        {
            skip: from,
            limit: limit,
            sort: lSort
        },
        function (err, accounts)
        {
            var lAccounts = JSON.parse(JSON.stringify(accounts));

            for(var iA = 0 ; iA < lAccounts.length ; iA++)
            {
                var lAccount = lAccounts[iA];
                var lLocalTopScores = lAccount.topScores[locale];
                lAccounts[iA].value = lLocalTopScores.value;

                delete lAccounts[iA].topScores;
            }

            //emit the event
            self.emit("scoresLoadComplete" , lAccounts);
        })

    return;

    Score
        .find({locale:locale , account: {'$ne': null }},
        '-_id value account',
        {
            skip: from,
            limit: limit,
            sort:{
                value: -1
            }
        },
        function (err, scores)
        {
            //emit the event
            self.emit("scoresLoadComplete" , scores);
        })
        .populate('account' , '-_id username');
}
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////   SAVE SCORE
Dal.prototype.saveScore = function(scoreValue,locale,account)
{
    console.log("saveScore");
    console.log("scoreValue:"+scoreValue);
    console.log("locale:"+locale);
    console.log(account);
    console.log("account._id:"+account._id);

    var self = this;

    //get topScores
    var lLocaleTopScore = account.topScores[locale];
    console.log(account.topScores);
    console.log(account.topScores[locale]);
    lLocaleTopScore.value = Math.max(scoreValue,lLocaleTopScore.value );

    //save the account with the max score
    account.save(function(err, account)
    {
        //save the score separately to get the history of all scores.
        console.log("before save1");
        var lScore = new Score();
        console.log("before save2");
        lScore.value    = scoreValue;
        lScore.account  = account;
        lScore.locale   = locale;

        lScore.save(function(err, score)
        {
            console.log(err);
            if (err)
            {
                self.emit("scoreSaved" , false);
            }else{
                self.emit("scoreSaved" , true);
            }
        });
    })
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// GETTER
Dal.prototype.isConnected = function() { return this.mConnected; }
Dal.prototype.getRand = function() { return this.rand; }


var dal = new Dal();
module.exports = exports = dal;