'use strict';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function GameService(socketService)
{
    console.log('GameService');

    /**
     * Socket
     */
    this.socketService = socketService;

    /**
     * Date when the game has been launched
     *
     * @type {null}
     * @private
     */
    this._startDate = null;

    /**
     * the number of columns
     */
    this.numColumns;
    this.numRows;
    this.locale;
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  NEW GAME
/**
 * Emit an event to the server to create a new game.
 * The servers returns automatically the new blocks and the points at start.
 *
 * @param numColumns
 * @param numRows
 * @param locale
 */
GameService.prototype.newGame = function(numColumns, numRows, locale)
{
    this.numColumns = numColumns;
    this.numRows = numRows;
    this.locale = locale;

    this.socketService.newGame(this.numColumns, this.numRows, this.locale);
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
GameService.$inject = ['socketService'];
angular.module('game').service('gameService', GameService);
