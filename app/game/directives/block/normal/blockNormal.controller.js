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
    this.selectionService.on('selectionChanged', function ()
    {
        self.selected = self.selectionService.isBlockSelected(self.uid);
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
/**
 * This method is called by the ColumnService as much as the block has to move down in term of position
 */
BlockNormalController.prototype.decrementPosition = function ()
{
    this._numDecrements++;
}
/**
 * Applies the movement to down
 * This movement is defined by _numDecrements
 */
BlockNormalController.prototype.moveToDown = function ()
{
    if (this._numDecrements === 0) {
        return;
    }

    //compute new position
    var dY = this.size * this._numDecrements;
    var newY = (parseInt(this.$element.css('top'), 10) + dY) + 'px';

    //animation
    TweenLite.to(this.$element, 0.25, {top: newY, ease: Bounce.easeOut});

    //init the numDecrements
    this._numDecrements = 0;
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// COLUMN / ROW
BlockNormalController.prototype.getColumnIndex = function ()
{
    return Math.round(parseFloat(this.$element.css('left')) / this.$element.children()[0].clientWidth);
};
BlockNormalController.prototype.getRowIndex = function ()
{
    var blockWidth = this.$element.children()[0].clientWidth
    var blockTop = parseFloat(this.$element.css('top'))
    return Math.round(((this.gameService.numRows - 1) * blockWidth - blockTop) / blockWidth);
};
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////  REMOVE
BlockNormalController.prototype.appear = function ()
{
    TweenLite.from(this.$element, Math.random() * 2, {scaleX: 0, scaleY: 0, ease: Elastic.easeOut});
}
BlockNormalController.prototype.remove = function ()
{
    this.$element.remove();
}
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
BlockNormalController.$inject = ['$element', 'selectionService', 'gameService'];
angular.module('game').controller('BlockNormalController', BlockNormalController);

