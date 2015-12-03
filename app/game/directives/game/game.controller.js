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

    /**
     * Binded locale
     */
    this.locale;

    /**
     * Binded UUID
     */
    this.uuid;
}

GameController.prototype.newGame = function() {
    this.gameService.newGame(this.numColumns, this.numRows, this.locale, this.uuid);
}

GameController.$inject = ['gameService', 'accountService'];
angular.module('game').controller('GameController', GameController);
