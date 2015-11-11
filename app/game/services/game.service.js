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
    if ( numColumns && numColumns > 0 )
    {
        if ( numRows && numRows > 0 )
        {
            if (locale)
            {
                this.numColumns = numColumns;
                this.numRows = numRows;
                this.locale = locale;


                this.socketService.emitNewGame({
                    "numColumns": this.numColumns ,
                    "numRows": this.numRows,
                    "locale" : this.locale
                });

            }else{
                angular.$log.warn('Can not create the game. The locale has to be defined');
            }
        }else{
            angular.$log.warn('Can not create the game. The number of rows has to be defined');
        }
    }else{
        angular.$log.warn('Can not create the game. The number of columns has to be defined');
    }
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
GameService.$inject = ['socketService'];
angular.module('game').service('gameService', GameService);
