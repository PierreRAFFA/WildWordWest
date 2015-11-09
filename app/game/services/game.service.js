'use strict';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function GameService(eventEmitter, socket)
{
    console.log('GameService');

    /**
     * Socket communication
     */
    this._socket = socket;

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

    eventEmitter.inject(GameService);
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

                this._socket.emit('new' , {
                    "numColumns": this.numColumns ,
                    "numRows": this.numRows,
                    "locale" : this.locale
                }, this._onUpdateGame.bind(this));

                this._bindSocketEvents();
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
/**
 * Lists all socket events emitted from the server.
 * @private
 */
GameService.prototype._bindSocketEvents = function()
{
    //triggered when the server adds new blocks for the game
    this._socket.on('updateGame' , this._onUpdateGame.bind(this));


}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// UPDATE
/**
 * Updates the board with the new blocks and the points
 * blockInfos may be empty if the word previously selected was not valid.
 * points may be equal to 0 if the word previously selected was not valid.
 *
 * @param blockInfos new block to insert to the columns
 * @param points points to add
 */
GameService.prototype._onUpdateGame = function(newBlocks, points)
{
    this.emit('updateGame' , newBlocks, points);
}
//GameService.prototype.updateGame = function(blockInfos, points)
//{
//
//    //blockInfos = [{"mLetter":"o","mType":"n","__row":0},{"mLetter":"s","mType":"n","__row":1},{"mLetter":"t","mType":"n","__row":2},{"mLetter":"c","mType":"n","__row":3},{"mLetter":"h","mType":"n","__row":4},{"mLetter":"r","mType":"n","__row":5},{"mLetter":"o","mType":"n","__row":6},{"mLetter":"e","mType":"n","__row":7},{"mLetter":"o","mType":"n","__row":8},{"mLetter":"e","mType":"s","__row":0},{"mLetter":"i","mType":"n","__row":1},{"mLetter":"a","mType":"n","__row":2},{"mLetter":"p","mType":"n","__row":3},{"mLetter":"e","mType":"n","__row":4},{"mLetter":"n","mType":"n","__row":5},{"mLetter":"a","mType":"n","__row":6},{"mLetter":"p","mType":"n","__row":7},{"mLetter":"e","mType":"n","__row":8},{"mLetter":"d","mType":"n","__row":0},{"mLetter":"a","mType":"b","__row":1},{"mLetter":"t","mType":"n","__row":2},{"mLetter":"s","mType":"n","__row":3},{"mLetter":"s","mType":"n","__row":4},{"mLetter":"d","mType":"n","__row":5},{"mLetter":"e","mType":"n","__row":6},{"mLetter":"o","mType":"n","__row":7},{"mLetter":"n","mType":"n","__row":8},{"mLetter":"l","mType":"s","__row":0},{"mLetter":"s","mType":"n","__row":1},{"mLetter":"a","mType":"n","__row":2},{"mLetter":"m","mType":"n","__row":3},{"mLetter":"b","mType":"n","__row":4},{"mLetter":"z","mType":"n","__row":5},{"mLetter":"v","mType":"s","__row":6},{"mLetter":"e","mType":"s","__row":7},{"mLetter":"e","mType":"n","__row":8},{"mLetter":"r","mType":"n","__row":0},{"mLetter":"i","mType":"n","__row":1},{"mLetter":"a","mType":"n","__row":2},{"mLetter":"r","mType":"n","__row":3},{"mLetter":"e","mType":"n","__row":4},{"mLetter":"t","mType":"n","__row":5},{"mLetter":"s","mType":"n","__row":6},{"mLetter":"u","mType":"n","__row":7},{"mLetter":"e","mType":"n","__row":8},{"mLetter":"t","mType":"n","__row":0},{"mLetter":"r","mType":"b","__row":1},{"mLetter":"t","mType":"n","__row":2},{"mLetter":"o","mType":"n","__row":3},{"mLetter":"a","mType":"n","__row":4},{"mLetter":"n","mType":"n","__row":5},{"mLetter":"n","mType":"n","__row":6},{"mLetter":"r","mType":"n","__row":7},{"mLetter":"e","mType":"n","__row":8},{"mLetter":"s","mType":"n","__row":0},{"mLetter":"i","mType":"n","__row":1},{"mLetter":"n","mType":"n","__row":2},{"mLetter":"i","mType":"n","__row":3},{"mLetter":"e","mType":"n","__row":4},{"mLetter":"h","mType":"n","__row":5},{"mLetter":"e","mType":"n","__row":6},{"mLetter":"o","mType":"n","__row":7},{"mLetter":"e","mType":"n","__row":8}];
//}

///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
GameService.$inject = ['eventEmitter', 'socket'];
angular.module('game').service('gameService', GameService);
