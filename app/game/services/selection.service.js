'use strict';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
/**
 * This service manages the block selection
 * It may dispatch an event when the selection has changed.
 * It may dispatch an event when the selection is validated.
 *
 * @param eventEmitter
 * @constructor
 */
function SelectionService(eventEmitter)
{
    /**
     * Array of informations of selected blocks (columnIndex, rowIndex, letter )
     * @type {Array}
     * @private
     */
    this._selectedBlocks = [];

    /**
     * For code optimisation, to search some blocks.
     * @type {{}}
     * @private
     */
    this._selectedBlocksMap = {};

    eventEmitter.inject(SelectionService);
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  NEW GAME
/**
 * Manages the selection depending on the parameters sent.
 * 2 events may be dispatched.
 *
 * @param columnIndex
 * @param rowIndex
 * @param letter
 */
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

                this.emit('selectionValidated', this._selectedBlocks);
                return;
            }else{
                return;
            }
        }else{

            var columnIndexDiff    = Math.abs(lastSelectedBlock.columnIndex - columnIndex);
            var rowIndexDiff       = Math.abs(lastSelectedBlock.rowIndex - rowIndex);
            if ( columnIndexDiff > 1 || rowIndexDiff > 1)
            {
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

/**
 * Specifies whether or not a block is a part of the current selection
 *
 * @param columnIndex
 * @param rowIndex
 * @param letter
 * @returns {*}
 */
SelectionService.prototype.isBlockSelected = function(columnIndex, rowIndex, letter)
{
    var key = columnIndex + '-' +  rowIndex + '-' + letter;
    return this._selectedBlocksMap.hasOwnProperty(key);
}

/**
 * SelectedBlocks getter
 *
 * @returns {Array}
 */
SelectionService.prototype.getSelectedBlocks = function()
{
    return this._selectedBlocks;
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
SelectionService.$inject = ['eventEmitter'];
angular.module('game').service('selectionService', SelectionService);
