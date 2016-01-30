'use strict';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function GameService(eventEmitter, socketService, $timeout)
{
    console.log('GameService');

    eventEmitter.inject(GameService);

    /**
     * Socket
     */
    this.socketService = socketService;

    /**
     * Socket
     */
    this.$timeout = $timeout;

    /**
     * the number of columns
     */
    this.numColumns;

    /**
     * the number of rows
     */
    this.numRows;

    this.bindSocketEvents();
}

GameService.prototype.bindSocketEvents = function()
{
    var self = this;
    this.socketService.on('start', function(update)
    {
        self.emit('countdown');


        self.$timeout(function()
        {
            self.emit('start');
            self.emit('updateGame', update);
        }, 4000);
    });

    this.socketService.on('updateGame', function(update) {
        self.emit('updateGame', update);
    });

    this.socketService.on('gameOver', function(time) {
        self.emit('gameOver', time);
    });
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  NEW GAME
/**
 * Emits an event to the server to create a new game.
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

    this._listeners = {};
    this.socketService.newGame(this.numColumns, this.numRows, locale, platform, gameCenterId, name);
}

GameService.prototype.submitWord = function (data)
{
    this.socketService.submitWord(data);
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
GameService.$inject = ['eventEmitter', 'socketService', '$timeout'];
angular.module('game').service('gameService', GameService);
