'use strict';

(function (angular)
{
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////  CONSTRUCTOR
    function Column()
    {
        this.blocks = [];

        this.blocksToBeKilled = [];
    }

    Column.prototype.getInstance = function() {
        return new Column();
    }
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////  START
    Column.prototype.addBlock = function(block)
    {
        this.blocks.push(block);
    }

    Column.prototype.getNumBlocks = function()
    {
        return this.blocks.length;
    }
    Column.prototype.getBlockByIndex = function(index)
    {
        return this.blocks[index];
    }
    Column.prototype.getBlockIndex = function(block)
    {
        return this.blocks.indexOf(block);
    }
    

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////// ANGULAR REGISTERING
    Column.$inject = [];
    angular.module('game').service('Column', Column);

})(angular);
