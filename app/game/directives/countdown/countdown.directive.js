'use strict';

angular.module('game').directive('wildCountdown', [
    function () {
        return {
            templateUrl: 'game/directives/countdown/countdown.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
            },
            controller: 'CountdownController',
            controllerAs: 'vm'
        };
    }
]);
