'use strict';

angular.module('game').directive('wildTimer', [
    function () {
        return {
            templateUrl: 'game/directives/timer/timer.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
            },
            controller: 'TimerController',
            controllerAs: 'vm'
        };
    }
]);
