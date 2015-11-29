var Board   = require('./board.js');

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
    this._board = new Board(locale,numColumns,numRows);
    this._board.on('gameOver' , this._onGameOver.bind(this));
}

Game.prototype.getBoard = function()
{
    return this._board;
}
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
        }else{
            //@TODO
        }
    });

}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// SAVE SCORE
Game.prototype._saveScore = function()
{
    var params = {
        uuid: this._uuid,
        locale: this._locale,
        time: this._board.getScore()
    };
    accounts.saveScore(params, function(success)
    {

    });
}