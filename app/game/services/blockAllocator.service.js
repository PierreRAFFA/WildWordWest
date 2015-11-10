'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
/**
 * This service allocated blocks to the columns which are in need
 *
 * @param eventEmitter
 * @constructor
 */
function BlockAllocatorService(eventEmitter, Column, $compile, $controller, BlockType)
{
    this._column = Column;
    this.$compile = $compile;
    this.$controller = $controller;
    this.BlockType = BlockType;

    /**
     * Column List wich contains blocks
     * @type {Array}
     */
    this._columns = [];

    /**
     * Number of columns to consider
     * @type {number}
     */
    this._numColumns = 0;

    /**
     * Number of rows to consider
     * @type {number}
     */
    this._numRows = 0;

    /**
     * Used to create the block directive
     *
     * @type {null}
     * @private
     */
    this._scope = null;

    this._blockSize = 0;

    eventEmitter.inject(BlockAllocatorService);
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  INIT
/**
 * Initialises the allocator
 *
 * @param numColumns
 * @param numRows
 */
BlockAllocatorService.prototype.init = function(numColumns, numRows, blockSize, scope)
{
    this._numColumns = numColumns;
    this._numRows = numRows;
    this._blockSize = blockSize;
    this._scope = scope;

    for(var iC = 0 ; iC < this._numColumns ; iC++)
    {
        this._columns.push(this._column.getInstance());
    }
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ALLOCATE A BLOCK
BlockAllocatorService.prototype.allocate = function(blockInfo)
{
    var blockElement = this._createBlock(blockInfo);

    //store
    var columnIndex = this._addBlockToColumInNeed(blockElement);

    if (columnIndex != null)
    {
        var column = this._columns[columnIndex];

        var left = columnIndex * this._blockSize;
        var top = ((this._numRows - 1) * this._blockSize - column.getBlockIndex(blockElement) * this._blockSize);

        blockElement.css('left' , left + 'px');
        blockElement.css('top' , top + 'px');
        blockElement.css('position' , 'absolute');

    } else {
        console.error("Some blocks have to be added but no column can accept them.")
    }

    return blockElement;
}
/**
 * Creates a block depending on its type anf injects the letter, type and size
 *
 * @param blockInfo
 * @returns {*} the block as HtmlElement
 * @private
 */
BlockAllocatorService.prototype._createBlock = function(blockInfo)
{
    //create block
    var block = null;
    switch (blockInfo._type)
    {
        case this.BlockType.normal:
            block = angular.element(document.createElement('wild-block-normal'));
            break;
        case this.BlockType.bonus:
            block = angular.element(document.createElement('wild-block-bonus'));
            break;
        case this.BlockType.bomb:
            block = angular.element(document.createElement('wild-block-bomb'));
            break;
    }

    block.attr('letter' , blockInfo._letter);
    block.attr('type' , blockInfo._type);
    block.attr('size' , this._blockSize);

    var blockElement = this.$compile(block)(this._scope);
    return blockElement;
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
BlockAllocatorService.prototype._addBlockToColumInNeed = function(blockElement)
{
    var columnIndex = this._getColumnIndexInNeed();

    if ( columnIndex != null && columnIndex >= 0)
    {
        this._columns[columnIndex].addBlock(blockElement);
    }
    return columnIndex;
}
BlockAllocatorService.prototype._getColumnIndexInNeed = function()
{
    var returnedColumnIndex = null;

    for(var iC = 0 ; iC < this._columns.length ; iC++)
    {
        var column = this._columns[iC];
        if ( column.getNumBlocks() < this._numRows)
        {
            returnedColumnIndex = iC;
            return iC;
        }
    }

    return returnedColumnIndex;
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
BlockAllocatorService.$inject = ['eventEmitter', 'Column', '$compile', '$controller','BlockType'];
angular.module('game').service('blockAllocatorService', BlockAllocatorService);
