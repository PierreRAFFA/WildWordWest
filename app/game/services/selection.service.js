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

    /**
     * Word formed by the selection
     *
     * @type {string}
     * @private
     */
    this._word = '';

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
SelectionService.prototype.select = function(columnIndex, rowIndex, letter, type, uid)
{
    //get the last selected block
    var lastSelectedBlock = this._selectedBlocks[this._selectedBlocks.length - 1];

    if (this._selectedBlocks.length)
    {
        var isBlockAlreadySelected = this._selectedBlocksMap.hasOwnProperty(uid);

        if (isBlockAlreadySelected)
        {
            var lastSelectedBlockUid = lastSelectedBlock.uid;

            //this means the block was clicked twice on the row => submit the word
            if (uid === lastSelectedBlockUid)
            {
                this.emit('selectionValidated', this._selectedBlocks, this._word);
                return;
            } else {
                return;
            }
        } else {

            var columnIndexDiff    = Math.abs(lastSelectedBlock.columnIndex - columnIndex);
            var rowIndexDiff       = Math.abs(lastSelectedBlock.rowIndex - rowIndex);
            if ( columnIndexDiff > 1 || rowIndexDiff > 1)
            {
                //new start of selection => init
                this._selectedBlocks = [];
                this._selectedBlocksMap = {};
                this._word = '';
            }
        }
    }

    //add the block the the selection
    var value = {
        columnIndex: columnIndex,
        rowIndex: rowIndex,
        letter: letter,
        type: type,
        uid: uid
    }

    this._selectedBlocks.push(value);
    this._selectedBlocksMap[uid] = value;
    this._word += letter;

    this.emit('selectionChanged');
}

/**
 * Clears the selection
 */
SelectionService.prototype.clear = function()
{
    this._selectedBlocks = [];
    this._selectedBlocksMap = {};
    this._word = '';
    this.emit('selectionChanged');
}

/**
 * Specifies whether or not a block is a part of the current selection
 *
 * @param uid
 * @returns {*}
 */
SelectionService.prototype.isBlockSelected = function(uid)
{
    return this._selectedBlocksMap.hasOwnProperty(uid);
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

/**
 * In the interest of performance, returns the word created by the selection.
 *
 * @returns {Array}
 */
SelectionService.prototype.getWord = function()
{
    return this._word;
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
SelectionService.$inject = ['eventEmitter'];
angular.module('game').service('selectionService', SelectionService);
