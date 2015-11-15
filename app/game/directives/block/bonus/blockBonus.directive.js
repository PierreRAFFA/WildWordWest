'use strict';
angular.module('game').directive('wildBlockBonus', [
    function () {
        return {
            templateUrl: 'game/directives/block/bonus/blockBonus.html',
            restrict: 'E',
            replace: false,
            transclude: true,
            scope: {},
            bindToController: {
                'letter': '@',
                'type': '@',
                'size': '@',
                'uid': '@'
            },
            controller: 'BlockBonusController',
            controllerAs: 'vm'
        };
    }
]);
