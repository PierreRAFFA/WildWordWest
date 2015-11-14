'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
/**
 * This service allocated blocks to the columns which are in need
 *
 * @param eventEmitter
 * @constructor
 */
function BlockAllocatorService(Column, $compile, $controller, BlockType)
{
    this.Column = Column;
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

    /**
     * Block size when creation ( computed in board.controller.js )
     * @type {number}
     * @private
     */
    this._blockSize = 0;
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
        this._columns.push(this.Column.getInstance());
    }
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  ALLOCATE A BLOCK
/**
 * Allocates a block to a column
 *
 * @param blockInfo (_type, _letter)
 * @returns {*} the created block as HtmlElement
 */
BlockAllocatorService.prototype.allocate = function(blockInfo)
{
    //store
    var coordinates = this._addBlockToColumInNeed(blockInfo);

    //create the block
    var blockElement = this._createBlock(blockInfo,coordinates);

    if (coordinates.columnIndex != null)
    {
        var column = this._columns[coordinates.columnIndex];

        var left = coordinates.columnIndex * this._blockSize;
        var top = ((this._numRows - 1) * this._blockSize - column.getBlockIndex(blockInfo) * this._blockSize);

        blockElement.css('left' , left + 'px');
        blockElement.css('top' , top + 'px');
        blockElement.css('position' , 'absolute');

    } else {
        angular.$log.warn("Some blocks have to be added but no column can accept them.");
    }

    return blockElement;
}

/**
 * Creates a block depending on its type anf injects the letter, type and size
 *
 * @param blockInfo (_type, _letter)
 * @param coordinates (columnIndex, rowIndex)
 * @returns {*} the block as HtmlElement
 * @private
 */
BlockAllocatorService.prototype._createBlock = function(blockInfo, coordinates)
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
    block.attr('uid' , this._guid(blockInfo, coordinates));

    return this.$compile(block)(this._scope);
}
/**
 * Generates an uuid for the block
 *
 * @param blockInfo
 * @param coordinates (columnIndex, rowIndex)
 * @returns {string}
 * @private
 */
BlockAllocatorService.prototype._guid = function(blockInfo,coordinates)
{
    return coordinates.columnIndex + '-' +
    coordinates.rowIndex + '-' + blockInfo._letter + '-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  COLUMN MANAGEMENT
/**
 * Adds a block to a column and returns the block coordinates in the grid
 *
 * @param blockInfo (_type, _letter)
 * @returns {*} coordinates (columnIndex, rowIndex)
 * @private
 */
BlockAllocatorService.prototype._addBlockToColumInNeed = function(blockInfo)
{
    var coordinates = {};

    var columnIndex = this._getColumnIndexInNeed();

    if ( columnIndex != null && columnIndex >= 0)
    {
        this._columns[columnIndex].addBlock(blockInfo);

        coordinates.columnIndex = columnIndex;
        coordinates.rowIndex = this._columns.length;
    }

    return coordinates;
}
/**
 * Returns the column which need a block while respecting a specific priority to allocate the block to the column
 *
 * @returns {*}
 * @private
 */
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
///////////////////////////////////////////////////////////  DEALLOCATE BLOCKS
/**
 * Deallocates some blocks
 *
 * @param blockInfos array of blockInfos (columnIndex, rowIndex, letter, type, uid)
 */
BlockAllocatorService.prototype.deallocate = function(blockInfos)
{
    var self = this;

    //extend the submitted blocks with closest blocks of bomb
    var explodedBlocks = [];
    for(var iB = 0 ; iB < blockInfos.length ; iB++)
    {
        var block = blockInfos[iB];
        if ( block.type === this.BlockType.bomb)
        {
            explodedBlocks = explodedBlocks.concat(this.getClosestBlocks(block));
        }
    }

    //concatenate selected blocks + closest blocks in case of bomb(s)
    var blockListToRemove = blockInfos.concat(explodedBlocks);

    //prepare the remove
    for(var iB = 0 ; iB < blockListToRemove.length ; iB++)
    {
        var block = blockListToRemove[iB];

        //get block column
        var column = this._columns[block.columnIndex];

        //remove blocks from the column
        var blocksToDown = column.prepareToRemoveBlock(block);
        console.log(blocksToDown);
    }

    //execute the remove
    for(var iC = 0 ; iC < this._columns.length ; iC++)
    {
        var column = this._columns[iC];
        column.executeRemoveBlocks();
    }

    //reset submitted blocks
    //blockInfos = [];
}
BlockAllocatorService.prototype.getClosestBlocks = function(block)
{
    var self = this;

    var closestBlocks = [];

    //define the distance of the bomb impact
    var impactDistance = 1;

    var column = block.columnIndex;
    var row    = block.rowIndex;

    for(var iC = column - impactDistance; iC <= column + impactDistance ; iC++)
    {
        for(var iR = row - impactDistance; iR <= row + impactDistance ; iR++)
        {
            //detect limit of the grid and ignore the block whose position is the same than the parameters
            if ( iC >= 0 && iC < this.numColumns
                && iR >= 0 && iR < this.numRows
                && (iC == column && iR == row) == false )
            {
                closestBlocks.push(this._columns[iC].getBlockByIndex(iR));
            }
        }
    }

    return closestBlocks;

}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
BlockAllocatorService.$inject = ['Column', '$compile', '$controller','BlockType'];
angular.module('game').service('blockAllocatorService', BlockAllocatorService);
