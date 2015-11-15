'use strict';
function GameController() {
    this.numColumns;
    this.numRows;
    this.locale;
}

GameController.$inject = [];
angular.module('game').controller('GameController', GameController);
