'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function CountdownController(gameService)
{
    /**
     * The best word found by the gamer
     * @type {string}
     */
    this.word = '';

    /**
     * Specifies the best points winned for a word.
     * @type {number}
     */
    this.points = 0;

    /**
     * socket service
     */
    this.gameService = gameService;

    //socket events
    this.gameService.on('updateGame', this._onUpdate.bind(this));
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ON SELECTION CHANGED
CountdownController.prototype._onSelectionValidated = function()
{
    //var word = this.selectionService.getWord();
}
CountdownController.prototype._onUpdate = function(update)
{
    if (update.hasOwnProperty('highestWord') && update.hasOwnProperty('highestWordPoints')) {
        this.word = update.highestWord;
        this.points = update.highestWordPoints;
    }
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
CountdownController.$inject = ['gameService'];
angular.module('game').controller('CountdownController', CountdownController);

