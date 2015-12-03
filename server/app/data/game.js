var Board   = require('./board.js');
var EventEmitter = require('events').EventEmitter;
var accounts = require('../../app/controllers/accounts.server.controller');

/**
 * Module exports.
 */

module.exports = Game;
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// CONSTRUCTOR
function Game(uuid, locale, numColumns, numRows)
{
    /**
     * UUID send by the application ( AppStore, GooglePlay )
     */
    this._uuid = uuid;

    /**
     * Locale chosen by the player at start
     */
    this._locale = locale;

    /**
     * Game Board Model
     */
    this._board = new Board(locale, numColumns, numRows);

    this._init();
}
// inherit events.EventEmitter
Game.prototype = Object.create(EventEmitter.prototype);
Game.prototype.constructor = Game;
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// INIT
Game.prototype._init = function()
{
    this._board.on('gameOver' , this._onGameOver.bind(this));
    //var eventName = ['initialized', 'boardUpdated']
}

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/**
 * Auto-save the score if the account already exists.
 * Otherwise, wait for client-side to get the user name/email (createAccountAndSaveScore)
 *
 * @private
 */
Game.prototype._onGameOver = function()
{
    console.log('_onGameOver');
    this._saveScore();
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// CREATE ACCOUNT
/**
 * Create an account, then save the score.
 *
 * @param name
 * @param email
 */
Game.prototype.createAccountAndSaveScore = function(name, email)
{
    console.log('createAccountAndSaveScore');
    var self = this;

    var params = {
        uuid: this._uuid,
        name: name,
        email: email,
        selectedLocale: this._locale
    };

    accounts.create(params, function(success) {

        console.log(success);

        if (success)
        {
            self._saveScore();
        } else {
            //@TODO
        }
    });
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// SAVE SCORE
Game.prototype._saveScore = function()
{
    var self = this;

    var params = {
        uuid: this._uuid,
        locale: this._locale,
        time: this._board.getScore(),
        points: this._board.getTotalPointsWon(),
        highestWord: this._board.getHighestWord(),
        highestWordPoints: this._board.getHighestWordPoints()
    };
    accounts.saveScore(params, function(result)
    {
        self.emit('scoreSaved', result);
    });
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// GETTER
Game.prototype.getBoard = function()
{
    return this._board;
}