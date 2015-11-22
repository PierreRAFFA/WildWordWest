'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function BlastController(selectionService)
{
    /**
     * Word to display
     * @type {string}
     */
    this.word = '';

    /**
     * Selection service
     */
    this.selectionService = selectionService;

    //selection events
    this.selectionService.on('selectionChanged', this._onSelectionChanged.bind(this));
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ON SELECTION CHANGED
BlastController.prototype._onSelectionChanged = function()
{
    this.word = this.selectionService.getWord();
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
BlastController.$inject = ['selectionService'];
angular.module('game').controller('BlastController', BlastController);

