'use strict';

/**
 * This service manages a column containing some blocks.
 *
 */
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function Column() {
    this._blocks = [];

    this._blocksToRemove = [];
}

Column.prototype.getInstance = function () {
    return new Column();
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  START
Column.prototype.addBlock = function (blockElement) {
    this._blocks.push(blockElement);
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
Column.prototype.removeBlockByIndex = function (blockIndex) {
    console.log('removeBlockByIndex');
    console.log(blockIndex);
    if (blockIndex >= 0 && blockIndex < this._blocks.length) {
        if (this._blocksToRemove.indexOf(this._blocks[blockIndex]) === -1) {

            this._blocksToRemove.push(this._blocks[blockIndex]);
        }
    }
}

Column.prototype.applyRemove = function () {
    var self = this;


    //arrange blocks from top to bottom
    this._blocksToRemove.sort(function (a, b) {
        return self.gC(a).getRowIndex() > self.gC(b).getRowIndex() ? -1 : 1;
    });

    //remove blocks and returns the blocks which have to move down
    var blocksToDown = {};

    angular.forEach(this._blocksToRemove, function (block) {
        //get block on the top of the block to remove
        var blockToRemoveController = self.gC(block);
        var blockRowIndex = blockToRemoveController.getRowIndex();
        for (var iB = blockRowIndex + 1; iB < self._blocks.length; iB++) {
            var blockOnTop = self._blocks[iB];
            var blockOnTopController = self.gC(blockOnTop);

            blockOnTopController.decrementPosition();
        }

        //remove the block
        self._doRemoveBlockByIndex(blockToRemoveController.getRowIndex());
    });

    this._blocksToRemove = [];

    //move block to down
    angular.forEach(this._blocks, function (block) {
        self.gC(block).moveToDown();
    });

    return blocksToDown;
}

Column.prototype._doRemoveBlockByIndex = function (index) {
    var block = this._blocks[index];
    this._blocks.splice(index, 1);

    var controller = this.gC(block);
    controller.remove();
}

/**
 * Returns the controller used for the block element ( directive )
 *
 * @param blockElement
 * @returns {*}
 */
Column.prototype.gC = function (blockElement) {
    return blockElement.children().scope().vm;
}

Column.prototype.getNumBlocks = function () {
    return this._blocks.length;
}
Column.prototype.getBlockByIndex = function (index) {
    return this._blocks[index];
}
Column.prototype.getBlockIndex = function (block) {
    return this._blocks.indexOf(block);
}


///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
Column.$inject = [];
angular.module('game').service('Column', Column);
