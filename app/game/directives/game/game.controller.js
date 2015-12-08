'use strict';
function GameController(gameService, accountService) {

    /**
     * GameService
     */
    this.gameService = gameService;

    /**
     * Account Service
     */
    this.accountService = accountService;

    /**
     * Binded number of columns
     */
    this.numColumns;

    /**
     * Binded number of rows
     */
    this.numRows;
}

GameController.prototype.newGame = function() {
    this.gameService.newGame(
        this.numColumns,
        this.numRows,
        this.accountService.selectedLocale,
        this.accountService.uuid,
        this.accountService.name);
}

GameController.$inject = ['gameService', 'accountService'];
angular.module('game').controller('GameController', GameController);
