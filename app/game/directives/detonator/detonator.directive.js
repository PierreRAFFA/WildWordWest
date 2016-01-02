'use strict';

angular.module('game').directive('wildDetonator', [
    function () {
        return {
            templateUrl: 'game/directives/detonator/detonator.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
            },
            controller: 'DetonatorController',
            controllerAs: 'vm'
        };
    }
]);
