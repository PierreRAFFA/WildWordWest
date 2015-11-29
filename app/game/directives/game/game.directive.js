'use strict';

angular.module('game').directive('wildGame', [
    function () {
        return {
            templateUrl: 'game/directives/game/game.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
                'numColumns': '@',
                'numRows': '@',
                'locale': '@',
                'uuid': '@'
            },
            controller: 'GameController',
            controllerAs: 'vm',
            link: function(scope, element, attrs, GameController) {

                GameController.newGame();
            }
        };
    }
]);
