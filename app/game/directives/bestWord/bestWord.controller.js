'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function BestWordController(socketService)
{
    /**
     * The best word found by the gamer
     * @type {string}
     */
    this.bestWord = '';

    /**
     * Specifies the best points winned for a word.
     * @type {number}
     */
    this.bestWordPoints = 0;

    /**
     * socket service
     */
    this.socketService = socketService;

    //socket events
    this.socketService.on('updateGame', this._onUpdate.bind(this));
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ON SELECTION CHANGED
BestWordController.prototype._onSelectionValidated = function()
{
    //var word = this.selectionService.getWord();
}
BestWordController.prototype._onUpdate = function(update)
{
    if (update.hasOwnProperty('bestWord') && update.hasOwnProperty('bestWordPoints')) {
        this.bestWord = update.bestWord;
        this.bestWordPoints = update.bestWordPoints;
    }
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
BestWordController.$inject = ['socketService'];
angular.module('game').controller('BestWordController', BestWordController);

