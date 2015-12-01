'use strict';

angular.module('game').directive('wildLogin', [
    function () {
        return {
            templateUrl: 'game/directives/login/login.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
                name: '@'
            },
            controller: 'LoginController',
            controllerAs: 'vm'
        };
    }
]);
