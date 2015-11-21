'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function WordController(selectionService)
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
WordController.prototype._onSelectionChanged = function()
{
    this.word = this.selectionService.getWord();
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
WordController.$inject = ['selectionService'];
angular.module('game').controller('WordController', WordController);

