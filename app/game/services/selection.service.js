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
    //the key of the new selection
    var key = columnIndex + '-' +  rowIndex + '-' + letter;

    //get the last selected block
    var lastSelectedBlock = this._selectedBlocks[this._selectedBlocks.length - 1];

    if (this._selectedBlocks.length)
    {
        var isBlockAlreadySelected = this._selectedBlocksMap.hasOwnProperty(key);

        if (isBlockAlreadySelected)
        {
            var lastSelectedBlockKey = lastSelectedBlock.columnIndex + '-' +  lastSelectedBlock.rowIndex + '-' + lastSelectedBlock.letter;

            //this means the block was clicked twice on the row => submit the word
            if (key === lastSelectedBlockKey)
            {
                angular.$log.log('submit the word');
            }else{
                return;
            }
        }else{

            var columnIndexDiff    = Math.abs(lastSelectedBlock.columnIndex - columnIndex);
            var rowIndexDiff       = Math.abs(lastSelectedBlock.rowIndex - rowIndex);
            console.log(columnIndexDiff)
            console.log(rowIndexDiff)
            if ( columnIndexDiff <= 1 && rowIndexDiff <= 1)
            {

            }else{
                //new start of selection => init
                this._selectedBlocks = [];
                this._selectedBlocksMap = {};
            }
        }
    }


    //add the block the the selection
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
