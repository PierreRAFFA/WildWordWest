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
     * the number of columns
     */
    this.numColumns;

    /**
     * the number of rows
     */
    this.numRows;
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
GameService.prototype.newGame = function(numColumns, numRows, locale, platform, gameCenterId, name)
{
    this.numColumns = numColumns;
    this.numRows = numRows;

    this.socketService.newGame(this.numColumns, this.numRows, locale, platform, gameCenterId, name);
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
GameService.$inject = ['socketService'];
angular.module('game').service('gameService', GameService);
