'use strict';

angular.module('game').directive('wildBlockBomb', [
    function () {
        return {
            templateUrl: 'game/directives/block/bomb/blockBomb.html',
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
            controller: 'BlockBombController',
            controllerAs: 'vm'
        };
    }
]);
