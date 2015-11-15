'use strict';

////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// CONSTRUCTOR
function BlockNormalController($element, selectionService, gameService) {
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
     * Size applied to the block
     * Binded
     */
    this.size;

    /**
     * uid
     * Binded
     */
    this.uid;

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

    /**
     * Selection State
     * @type {boolean}
     */
    this.selected = false;

    this._numDecrements = 0;

    var self = this;
    this.selectionService.on('selectionChanged', function () {
        self.selected = self.selectionService.isBlockSelected(self.uid);
        //console.log(self.selected);
    })

    this.appear();
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// ON CLICK
BlockNormalController.prototype.onClick = function () {
    this.selectionService.select(this.getColumnIndex(), this.getRowIndex(), this.letter, this.type, this.uid);
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// DECREMENT POSITION
BlockNormalController.prototype.decrementPosition = function () {
    console.log('decrementPosition');
    this._numDecrements++;
}
BlockNormalController.prototype.moveToDown = function () {
    if (this._numDecrements === 0) {
        return;
    }

    //console.log('=======moveToDown');
    //console.log(this.getColumnIndex(), this.getRowIndex(), this.letter);
    //console.log(this._numDecrements);

    var dY = this.size * this._numDecrements;
    console.log(dY);

    var newY = (parseInt(this.$element.css('top'), 10) + dY) + 'px';
    //this.$element.css('top', newY);
    TweenLite.to(this.$element, 0.25, {top: newY, ease: Bounce.easeOut});

    this._numDecrements = 0;
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// COLUMN / ROW
BlockNormalController.prototype.getColumnIndex = function () {
    return Math.round(parseFloat(this.$element.css('left')) / this.$element.children()[0].clientWidth);
};
BlockNormalController.prototype.getRowIndex = function () {
    var blockWidth = this.$element.children()[0].clientWidth
    var blockTop = parseFloat(this.$element.css('top'))
    return Math.round(((this.gameService.numRows - 1) * blockWidth - blockTop) / blockWidth);
};
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////  REMOVE
BlockNormalController.prototype.appear = function () {
    TweenLite.from(this.$element, Math.random() * 2, {scaleX: 0, scaleY: 0, ease: Elastic.easeOut});
}
BlockNormalController.prototype.remove = function () {
    this.$element.remove();
}
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
BlockNormalController.$inject = ['$element', 'selectionService', 'gameService'];
angular.module('game').controller('BlockNormalController', BlockNormalController);

