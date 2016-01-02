'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function BoardController($scope, $element, gameService, selectionService, blockAllocatorService)
{
    this.$scope = $scope;
    this.$element = $element;
    this.gameService = gameService;
    this.selectionService = selectionService;
    this.blockAllocatorService = blockAllocatorService;

    this.numColumns;
    this.numRows;
    this.locale;

    /**
     * Block size in pixels depending on the screen size
     */
    this.blockSize;

    /**
     * Select Block List. Used to remove this blocks if the word is valid
     * @type {Array}
     */
    this._submittedBlocks = [];


    //socket events
    this.gameService.on('updateGame', this._onUpdate.bind(this));

    //selection events
    this.selectionService.on('selectionValidated', this._onSelectionValidated.bind(this));

}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  INIT
BoardController.prototype.init = function()
{
    this._defineBlockRenderProperties();

    this.blockAllocatorService.init(this.numColumns, this.numRows, this.blockSize, this.$scope);
}
/**
 * Defines the blocks render properties depending on the screen size.
 * Note that this method is called once at the begininng
 * because we assume that the screen is not resizable and not orientable
 *
 * @private
 */
BoardController.prototype._defineBlockRenderProperties = function()
{
    var boardW = this.$element[0].querySelector('.grid').clientWidth;
    this.blockSize = Math.round(boardW / this.numColumns);
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// ON UPDATE (FROM THE SOCKET)
/**
 * Updates the board with the new blocks.
 * blockInfos may be empty if the word previously selected was not valid.
 * points may be equal to 0 if the word previously selected was not valid.
 *
 * @param newBlocks new block to insert to the columns
 * @param points points to add
 */
BoardController.prototype._onUpdate = function(update)
{
    angular.$log.info('_onUpdate___');

    var isWordValid = update.points !== 0 && update.blocks && update.blocks.length > 0;

    if (isWordValid )
    {
        this.selectionService.clear();
        //var word = this._getWordFromSelectedBlocks();
        //this.events.onWordValid.dispatch(points,lWord);

        //this.displayPointsOnTheGrid(points);

        this._addBlocks(update.blocks);
    } else {
        //here means that the word is invalid
        //this.notifyInvalidWord();
    }
}

////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// ADD BLOCKS
/**
 * Removes all submitted blocks before adding the new ones. ( synchronization )
 *
 * @param blockinfos
 */
BoardController.prototype._addBlocks = function(newBlocks)
{
    //clear the submitted blocks
    if (this._submittedBlocks.length) {
        this.blockAllocatorService.deallocate(this._submittedBlocks);
    }

    //add blocks to the column who needs
    for (var iB = 0; iB < newBlocks.length; iB++)
    {
        //get block info
        var blockInfo = newBlocks[iB];

        var blockElement = this.blockAllocatorService.allocate(blockInfo);

        //add the block to the board
        angular.element(this.$element[0].querySelector('.grid')).append(blockElement);
    }
};

BoardController.prototype._onSelectionValidated = function(selectedBlocks)
{
    //format selection
    var data = [];
    angular.forEach(selectedBlocks, function(block) {
        data.push([block.columnIndex, block.rowIndex]);
    });

    //store the blocks
    this._submittedBlocks = selectedBlocks;

    //emit socket event
    this.gameService.submitWord(data);
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
BoardController.$inject = ['$scope', '$element', 'gameService', 'selectionService', 'blockAllocatorService'];
angular.module('game').controller('BoardController', BoardController);

