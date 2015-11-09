'use strict';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function SelectionService(eventEmitter)
{
    console.log('SelectionService');

    /**
     * Array of block
     * @type {Array}
     * @private
     */
    this._selectedBlocks = [];

    this._selectedBlocksMap = {};

    eventEmitter.inject(SelectionService);
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  NEW GAME
SelectionService.prototype.select = function(columnIndex, rowIndex, letter)
{
    var key = columnIndex + '-' +  rowIndex + '-' + letter;
    var value = {
        columnIndex:columnIndex,
        rowIndex:rowIndex,
        letter:letter
    }

    this._selectedBlocks.push(value);
    this._selectedBlocksMap[key] = value;

    this.emit('selectionChanged');
}

SelectionService.prototype.getSelectedBlocks = function()
{
    return this._selectedBlocks;
}
SelectionService.prototype.isBlockSelected = function(columnIndex, rowIndex, letter)
{
    var key = columnIndex + '-' +  rowIndex + '-' + letter;
    return this._selectedBlocksMap.hasOwnProperty(key);
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
SelectionService.$inject = ['eventEmitter'];
angular.module('game').service('selectionService', SelectionService);
