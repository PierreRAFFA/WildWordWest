'use strict';

////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// CONSTRUCTOR
function BlockBombController($element, selectionService, gameService)
{
    BlockNormalController.call(this, $element, selectionService, gameService);
    this.letter;
    this.type;

    this.animateColor();
}
BlockBombController.prototype = Object.create(BlockNormalController.prototype);
BlockBombController.prototype.constructor = BlockBombController;


BlockBombController.prototype.animateColor = function()
{
    var $fireBlock = angular.element(this.$element[0].querySelector('.fire'));
    TweenMax.to($fireBlock, 0.7 + Math.random() * 0.1, {opacity: 0.8, ease: Power2.easeInOut, repeat: -1, yoyo: true});
}
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
BlockBombController.$inject = ['$element', 'selectionService', 'gameService'];
angular.module('game').controller('BlockBombController', BlockBombController);
