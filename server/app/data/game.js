var Board   = require('./board.js');
var EventEmitter = require('events').EventEmitter;
var accounts = require('../../app/controllers/accounts.server.controller');

/**
 * Module exports.
 */

module.exports = Game;
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// CONSTRUCTOR
function Game(numColumns, numRows, locale, uuid, name)
{
    /**
     * UUID send by the application ( Apple GameCenter, GooglePlay )
     */
    this._uuid = uuid;

    /**
     * Locale chosen by the player at start
     */
    this._locale = locale;

    /**
     * Game Board Model
     */
    this._board;

    this._updateAccount(uuid, name);

    this._createBoard(locale, numColumns, numRows);
}
// inherit events.EventEmitter
Game.prototype = Object.create(EventEmitter.prototype);
Game.prototype.constructor = Game;
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// IDENTIFY USER
/**
 * Check if the user exists, otherwise we add him
 * @param uuid
 * @private
 */
Game.prototype._updateAccount = function(uuid, name)
{
    console.log('_updateAccount');

    accounts.createOrUpdate({uuid: uuid, name: name} , function(success) {

        console.log('success');
        console.log(success);
    });
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// CREATE BOARD
Game.prototype._createBoard = function(locale, numColumns, numRows)
{
    this._board = new Board(locale, numColumns, numRows);
    this._board.on('gameOver' , this._onGameOver.bind(this));

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
/**
 * Saves the score of the user.
 * May create a new account if the uuid is unknown.
 * The new account is inactive until it is activated by the confirmation email
 *
 * @private
 */
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

    //create the account if needed
    accounts.findByUUID(this._uuid , function(account)
    {
        if (account)
        {
            self._doSaveScore(params);
        }else{
            accounts.create(params, function(success) {

                console.log(success);

                if (success)
                {
                    self._doSaveScore(params);
                } else {
                    //@TODO
                }
            });
        }
    });

}

Game.prototype._doSaveScore = function(params)
{
    var self = this;
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