'use strict';

////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// CONSTRUCTOR
function BlockBonusController($element, $window, selectionService, gameService, socketService) {
    BlockNormalController.call(this, $element, $window, selectionService, gameService, socketService);
    this.letter;
    this.type;
}

BlockBonusController.prototype = Object.create(BlockNormalController.prototype);
BlockBonusController.prototype.constructor = BlockBonusController;

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
BlockBonusController.$inject = ['$element', '$window', 'selectionService', 'gameService', 'socketService'];
angular.module('game').controller('BlockBonusController', BlockBonusController);
