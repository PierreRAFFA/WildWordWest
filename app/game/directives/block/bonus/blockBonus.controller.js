'use strict';

////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// CONSTRUCTOR
function BlockBonusController($element, selectionService, gameService)
{
    BlockNormalController.call(this, $element, selectionService, gameService);
    this.letter;
    this.type;
}

BlockBonusController.prototype = Object.create( BlockNormalController.prototype);
BlockBonusController.prototype.constructor = BlockBonusController;

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
BlockBonusController.$inject = ['$element', 'selectionService' , 'gameService'];
angular.module('game').controller('BlockBonusController', BlockBonusController);


