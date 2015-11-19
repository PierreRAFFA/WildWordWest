'use strict';
function GameController(gameService) {

    /**
     * Binded number of columns
     */
    this.numColumns;

    /**
     * Binded number of rows
     */
    this.numRows;

    /**
     * Binded locale
     */
    this.locale;

    /**
     * GameService
     */
    this.gameService = gameService;
}

GameController.prototype.newGame = function() {
    this.gameService.newGame(this.numColumns, this.numRows, this.locale);
}

GameController.$inject = ['gameService'];
angular.module('game').controller('GameController', GameController);
