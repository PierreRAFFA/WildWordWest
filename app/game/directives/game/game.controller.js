'use strict';

(function(angular)
{

    function GameController(gameService)
    {
        console.log('GameController');

        this.numColumns;
        this.numRows;
        this.locale;
    }

    GameController.$inject = ['gameService'];
    angular.module('game').controller('GameController', GameController);
})(angular);

