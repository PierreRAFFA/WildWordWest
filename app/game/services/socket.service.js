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
function SocketService(eventEmitter, socket) {
    /**
     * Socket communication
     */
    this._socket = socket;

    eventEmitter.inject(SocketService);

    //triggered when the server adds new blocks for the game
    this._socket.on('updateGame', this._updateGame.bind(this));

    this._socket.on('gameOver', this._onGameOver.bind(this));
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ON EVENTS

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  NEW GAME
/**
 * Get a new game by emitting a socket event
 *
 * @param numColumns
 * @param numRows
 * @param locale ex: en_GB, en_US, fr_FR
 */
SocketService.prototype.newGame = function (numColumns, numRows, locale, uuid) {
    if (numColumns && numColumns > 0) {
        if (numRows && numRows > 0) {
            if (locale) {
                if (uuid)
                {
                    var data = {
                        numColumns: numColumns,
                        numRows: numRows,
                        locale: locale,
                        uuid: uuid
                    };
                    this._socket.emit('new', data, this._updateGame.bind(this));
                } else {
                    angular.$log.warn('Can not create the game. The uuid has to be defined');
                }
            } else {
                angular.$log.warn('Can not create the game. The locale has to be defined');
            }
        } else {
            angular.$log.warn('Can not create the game. The number of rows has to be defined');
        }
    } else {
        angular.$log.warn('Can not create the game. The number of columns has to be defined');
    }

}
/**
 * Updates the board with the new blocks and the points
 * blockInfos may be empty if the word previously selected was not valid.
 * points may be equal to 0 if the word previously selected was not valid.
 *
 * @param update {block, points}
 */
SocketService.prototype._updateGame = function (update) {
    if (update.hasOwnProperty('blocks') && update.hasOwnProperty('points')) {
        this.emit('updateGame', update);
        this.emit('start');
    }
    else {
        angular.$log.warn('Can not initialize the game. The update from the server is invalid');
    }
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  SUBMIT WORD
/**
 * Submits a word by emitting a socket event
 *
 * @param data an array of coordinates (columnIndex, rowIndex) ( per exemple [[5,4],[4,4],[4,3]] )
 */
SocketService.prototype.submitWord = function (data) {

    if (data && data.length)
    {
        this._socket.emit('submitWord', data, this._onWordSubmitted.bind(this));
    } else {
        angular.$log.warn('Can not submit the word. The data is invalid.');
    }
}
SocketService.prototype._onWordSubmitted = function (update) {

    if (update.hasOwnProperty('blocks') &&
        update.hasOwnProperty('points') &&
        update.hasOwnProperty('bestWord') &&
        update.hasOwnProperty('bestWordPoints'))
    {
        console.log(update);
        this.emit('updateGame', update);
    } else {
        angular.$log.warn('Can not initialize the game. The update from the server is invalid');
    }
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  GENERIC EMIT
SocketService.prototype.emit = function (event, data) {

    this._socket.emit(event, data);
}

SocketService.prototype._onGameOver = function(time)
{
    console.log(time);

    var params = {
        name: 'PierreR2',
        email: 'pierre@me.com'
    }
    this._socket.emit('createAccount', params);
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
SocketService.$inject = ['eventEmitter', 'socket'];
angular.module('game').service('socketService', SocketService);
