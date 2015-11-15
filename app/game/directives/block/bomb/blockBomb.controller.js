'use strict';

////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// CONSTRUCTOR
function BlockBombController($element, selectionService, gameService) {
    BlockNormalController.call(this, $element, selectionService, gameService);
    this.letter;
    this.type;
}

BlockBombController.prototype = Object.create(BlockNormalController.prototype);
BlockBombController.prototype.constructor = BlockBombController;

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
BlockBombController.$inject = ['$element', 'selectionService', 'gameService'];
angular.module('game').controller('BlockBombController', BlockBombController);
