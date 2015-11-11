'use strict';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
/**
 * This service maintains the communication with the server with a socket.
 * It emits some events depending on the server events.
 *
 * @param eventEmitter
 * @constructor
 */
function SocketService(eventEmitter, socket)
{
    /**
     * Socket communication
     */
    this._socket = socket;

    eventEmitter.inject(SocketService);

    //triggered when the server adds new blocks for the game
    this._socket.on('updateGame' , this._onUpdateGame.bind(this));
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ON EVENTS
/**
 * Updates the board with the new blocks and the points
 * blockInfos may be empty if the word previously selected was not valid.
 * points may be equal to 0 if the word previously selected was not valid.
 *
 * @param blockInfos new block to insert to the columns
 * @param points points to add
 */
SocketService.prototype._onUpdateGame = function(newBlocks, points)
{
    this.emit('updateGame' , newBlocks, points);
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  EMIT EVENTS
SocketService.prototype.emitNewGame = function(data)
{
    this._socket.emit('new' , data , this._onUpdateGame.bind(this));
}

SocketService.prototype.emit = function(event, data)
{
    this._socket.emit(event , data);
}

///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
SocketService.$inject = ['eventEmitter', 'socket'];
angular.module('game').service('socketService', SocketService);
