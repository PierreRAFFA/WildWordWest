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
    this.mSubmittedBlocks = [];


    //socket events
    this.gameService.on('updateGame' , this._onUpdate.bind(this));

    //selection events
    this.selectionService.on('selectionValidated' , this._onSelectionValidated.bind(this));


    this.waitingForFirstBindings();
}
/**
 * Initialises the directive as soon as the binded values are set.
 */
BoardController.prototype.waitingForFirstBindings = function()
{
    var self = this;
    var vm = this;
    this.$scope.$watch('vm.numColumns',
        function ( newValue, oldValue )
        {
            self.numColumns = newValue;
            self._init();
        }
    );
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  INIT
BoardController.prototype._init = function()
{
    this._defineBlockRenderProperties();

    this.blockAllocatorService.init(this.gameService.numColumns, this.gameService.numRows, this.blockSize, this.$scope);
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
    var boardW = this.$element[0].querySelector('.board').clientWidth;
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
BoardController.prototype._onUpdate = function(newBlocks, points)
{
    console.log('_onUpdate');

    var isWordValid = points !== 0 && newBlocks && newBlocks.length;

    if (isWordValid )
    {
        //var word = this._getWordFromSelectedBlocks();
        //this.events.onWordValid.dispatch(points,lWord);

        //this.displayPointsOnTheGrid(points);

        this.addBlocks(newBlocks);
    }else{
        //here means that the word is invalid
        //this.notifyInvalidWord();
    }
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// ADD BLOCKS
/**
 * Add new blocks from the server ( synchronization )
 *
 * @param blockinfos
 */
BoardController.prototype.addBlocks = function(newBlocks)
{
    //clear the submitted blocks
    if (this.mSubmittedBlocks.length) {
        //this.removeSubmittedBlocks();
    }

    //add blocks to the column who needs
    for (var iB = 0; iB < newBlocks.length; iB++)
    {
        //get block info
        var blockInfo = newBlocks[iB];

        var blockElement = this.blockAllocatorService.allocate(blockInfo);

        //add the block to the board
        angular.element(this.$element[0].querySelector('.board')).append(blockElement);
    }
};


BoardController.prototype._getWordFromSelectedBlocks = function()
{
    var word = "";
    for(var iB = 0 ; iB < this.mSubmittedBlocks.length ; iB++)
    {
        var block = this.mSubmittedBlocks[iB];
        word += block.getLetter();
    }
    return word.toUpperCase();
}

BoardController.prototype._onSelectionValidated = function(selectedBlocks)
{

}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
BoardController.$inject = ['$scope', '$element', 'gameService', 'selectionService', 'blockAllocatorService'];
angular.module('game').controller('BoardController', BoardController);

