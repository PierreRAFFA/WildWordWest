'use strict';

angular.module('game').directive('wildGame', [
    function () {
        return {
            templateUrl: 'game/directives/game/game.html',
            restrict: 'E',
            replace: false,
            transclude: true,
            scope: {},
            bindToController: {
                'numColumns': '@',
                'numRows': '@',
                'locale': '@'
            },
            controller: 'GameController',
            controllerAs: 'vm'
        };
    }
]);
