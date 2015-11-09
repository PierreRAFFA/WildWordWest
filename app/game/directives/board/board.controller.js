'use strict';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function BoardController($scope, $element, gameService, $compile, $controller, Column, BlockType)
{
    var self = this;

    this.$scope = $scope;
    this.$element = $element;
    this.gameService = gameService;
    this.$compile = $compile;
    this.$controller = $controller;
    this.Column = Column;
    this.BlockType = BlockType;

    this.nucolumns;
    this.numRows;
    this.locale;

    /**
     * Block size in pixels
     */
    this.blockSize;

    this.letterFontSize;

    /**
     * Column List wich contains blocks
     * @type {Array}
     */
    this.columns = [];

    /**
     * Select Block List. Used to detect blocks in a row
     * @type {Array}
     */
    this.mSelectedBlocks = [];

    /**
     * Select Block List. Used to remove this blocks if the word is valid
     * @type {Array}
     */
    this.mSubmittedBlocks = [];

    //initialisation after receiving nucolumns
    var vm = this;
    $scope.$watch('vm.numColumns',
        function ( newValue, oldValue ) {

            self.numColumns = newValue;

            self._defineUIProperties();

            self.buildColumns();
        }
    );

    //socket events
    this.gameService.on('updateGame' , this._onUpdate.bind(this));
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  BUILD COLUMNS
BoardController.prototype._defineUIProperties = function()
{
    var boardW = this.$element[0].querySelector('.board').clientWidth;
    this.blockSize = Math.round(boardW / this.numColumns);

    this.letterFontSize = this.blockSize / 2;
}
BoardController.prototype.buildColumns = function()
{
    for(var iC = 0 ; iC < this.numColumns ; iC++)
    {
        // create a column
        var column = this.Column.getInstance();
        this.columns.push(column);
    }
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
    for (var iB = 0; iB < newBlocks.length; iB++) {

        //if ( iB > 2) continue;

        //get bloc info
        var blockInfo = newBlocks[iB];

        //create block
        var block = null;
        switch (blockInfo._type) {
            case this.BlockType.normal:
                console.log('wild-block-normal')
                block = angular.element(document.createElement('wild-block-normal'));
                break;
            case this.BlockType.bonus:
                console.log('wild-block-bonus')
                block = angular.element(document.createElement('wild-block-bonus'));
                break;
            case this.BlockType.bomb:
                console.log('wild-block-bomb')
                block = angular.element(document.createElement('wild-block-bomb'));
                break;
        }
        block.attr('letter' , blockInfo._letter);
        block.attr('type' , blockInfo._type);
        block.attr('size' , this.blockSize);
        //block.attr('data-ng-click' , "vm.onBlockClick()");
        var blockElement = this.$compile( block )( this.$scope);

        //add the block to the board
        angular.element(this.$element[0].querySelector('.board')).append(blockElement);

        ////listen mouseEvent on the block
        //block.events.onMouseDown.add(this.onBlockSelected, this);

        //store
        var columnIndex = this._addBlockToColumInNeed(block);
        //console.log(columnIndex);
        if (columnIndex != null)
        {
            var column = this.columns[columnIndex];

            var left = columnIndex * this.blockSize;
            var top = ((this.gameService.numRows - 1) * this.blockSize - column.getBlockIndex(block) * this.blockSize);

            console.log(left, top);
            blockElement.css('left' , left + 'px');
            blockElement.css('top' , top + 'px');
            blockElement.css('position' , 'absolute');

        } else {
            console.error("Some blocks have to be added but no column can accept them.")
        }
    }
};

//BoardController.prototype.onBlockClick = function()
//{
//    debugger;
//}

BoardController.prototype._addBlockToColumInNeed = function(block)
{
    var columnIndex = this._getColumnIndexInNeed();

    if ( columnIndex != null && columnIndex >= 0)
    {
        this.columns[columnIndex].addBlock(block);
    }
    return columnIndex;
}
BoardController.prototype._getColumnIndexInNeed = function()
{
    var returnedColumnIndex = null;

    for(var iC = 0 ; iC < this.columns.length ; iC++)
    {
        var column = this.columns[iC];
        if ( column.getNumBlocks() < this.gameService.numRows)
        {
            returnedColumnIndex = iC;
            return iC;
        }
    }

    return returnedColumnIndex;
}
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
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
BoardController.$inject = ['$scope', '$element', 'gameService', '$compile', '$controller', 'Column', 'BlockType'];
angular.module('game').controller('BoardController', BoardController);

