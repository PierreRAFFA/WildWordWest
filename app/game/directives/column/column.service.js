'use strict';

/**
 * This service manages a column containing some blocks.
 *
 */
(function (angular)
{
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////  CONSTRUCTOR
    function Column()
    {
        this._blocks = [];

        this._blocksToRemove = [];
    }

    Column.prototype.getInstance = function() {
        return new Column();
    }
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////  START
    Column.prototype.addBlock = function(block)
    {
        this._blocks.push(block);
    }

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    Column.prototype.prepareToRemoveBlock = function(block)
    {
        if (this.getBlockIndex(block) != -1) {
            if (this._blocksToRemove.indexOf(block) === -1)
            {
                this._blocksToRemove.push(block);
            }
        }
    }

    Column.prototype.executeRemoveBlocks = function()
    {
        var self = this;

        //arrange blocks from top to bottom
        this._blocksToRemove.sort(function(a,b)
        {
            return a.rowIndex > b.rowIndex ? -1 : 1;
        });

        //remove blocks and returns the blocks which have to move down
        var blocksToDown = {};

        angular.forEach(this._blocksToRemove, function(block)
        {
            if ( self.getBlockIndex(block) !== -1)
            {
                //get block on the top of the block to remove
                for(var iB = block.rowIndex+1 ; iB < self._blocks.length ; iB++)
                {
                    var blockOnTop = self._blocks[iB];
                    if ( blocksToDown.hasOwnProperty(blockOnTop.uid) === false)
                    {
                        blocksToDown[blockOnTop.uid] = 0;
                    }
                    blocksToDown[blockOnTop.uid]++;
                }

                //remove the block
                self._blocks.splice(block.rowIndex, 1);
            }
        });
        return blocksToDown;
    }

    Column.prototype.getNumBlocks = function()
    {
        return this._blocks.length;
    }
    Column.prototype.getBlockByIndex = function(index)
    {
        return this._blocks[index];
    }
    Column.prototype.getBlockIndex = function(block)
    {
        return this._blocks.indexOf(block);
    }
    

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////// ANGULAR REGISTERING
    Column.$inject = [];
    angular.module('game').service('Column', Column);

})(angular);
