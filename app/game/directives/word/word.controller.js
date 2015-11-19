'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function WordController($scope, $element, socketService, selectionService, blockAllocatorService)
{
    this.$scope = $scope;
    this.$element = $element;
    this.socketService = socketService;
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
    this.socketService.on('updateGame', this._onUpdate.bind(this));

    //selection events
    this.selectionService.on('selectionValidated', this._onSelectionValidated.bind(this));

}
///**
// * Initialises the directive as soon as the binded values are set.
// */
//WordController.prototype._waitingForFirstBindings = function()
//{
//    var self = this;
//    this.$scope.$watch('vm.numColumns',
//        function ( newValue, oldValue )
//        {
//            oldValue;
//            self.numColumns = newValue;
//
//        }
//    );
//}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  INIT
WordController.prototype.init = function()
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
WordController.prototype._defineBlockRenderProperties = function()
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
WordController.prototype._onUpdate = function(newBlocks, points)
{
    angular.$log.info('_onUpdate___');

    var isWordValid = points !== 0 && newBlocks && newBlocks.length > 0;

    if (isWordValid )
    {
        this.selectionService.clear();
        //var word = this._getWordFromSelectedBlocks();
        //this.events.onWordValid.dispatch(points,lWord);

        //this.displayPointsOnTheGrid(points);

        this._addBlocks(newBlocks);
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
WordController.prototype._addBlocks = function(newBlocks)
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
        angular.element(this.$element[0].querySelector('.board')).append(blockElement);
    }
};

WordController.prototype._onSelectionValidated = function(selectedBlocks)
{
    //format selection
    var data = [];
    angular.forEach(selectedBlocks, function(block) {
        data.push([block.columnIndex, block.rowIndex]);
    });

    //store the blocks
    this._submittedBlocks = selectedBlocks;

    //emit socket event
    this.socketService.submitWord(data);
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
WordController.$inject = ['$scope', '$element', 'socketService', 'selectionService', 'blockAllocatorService'];
angular.module('game').controller('WordController', WordController);

