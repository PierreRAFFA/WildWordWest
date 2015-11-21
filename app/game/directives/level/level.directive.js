'use strict';

angular.module('game').directive('wildLevel', [
    function () {
        return {
            templateUrl: 'game/directives/level/level.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
            },
            controller: 'LevelController',
            controllerAs: 'vm'
        };
    }
]);
