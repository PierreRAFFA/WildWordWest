'use strict';

    ////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////// CONSTRUCTOR
    function BlockNormalController($element, selectionService, gameService)
    {
        /**
         * Letter applied to the block
         * Binded
         */
        this.letter;

        /**
         * Type applied to the block
         * Binded
         */
        this.type;

        /**
         * the block HTML Element
         */
        this.$element = $element;

        /**
         * Used when the user click on a block
         */
        this.selectionService = selectionService;

        /**
         * Used when the user click on a block
         */
        this.gameService = gameService;

        this.selected = false;

        var self = this;
        this.selectionService.on('selectionChanged' , function()
        {
            self.selected  = self.selectionService.isBlockSelected(self.getColumnIndex(), self.getRowIndex(), self.letter);
            console.log(self.selected);
        })

    }
    ////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////// ON CLICK
    BlockNormalController.prototype.onClick = function()
    {
        this.selectionService.select(this.getColumnIndex(), this.getRowIndex(), this.letter);
    }

    ////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////// COLUMN / ROW
    BlockNormalController.prototype.getColumnIndex = function()
    {
        return Math.round(parseFloat(this.$element.css("left")) / this.$element[0].clientWidth);
    };
    BlockNormalController.prototype.getRowIndex = function()
    {
        parseFloat(this.$element.css("top"))

        var blockWidth = this.$element[0].clientWidth;
        var blockTop = parseFloat(this.$element.css("top"))
        return Math.round(((this.gameService.numRows-1) * blockWidth - blockTop) / blockWidth);
    };
    
    ////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    BlockNormalController.$inject = ['$element', 'selectionService' , 'gameService'];
    angular.module('game').controller('BlockNormalController', BlockNormalController);

