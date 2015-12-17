'use strict';

angular.module('game').directive('wildAccount', [
    function () {
        return {
            templateUrl: 'game/directives/account/account.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
                name: '@',
                level: '@',
                levelPercent: '@',
                balance: '@'
            },
            controller: 'AccountController',
            controllerAs: 'vm'
        };
    }
]);
