'use strict';

angular.module('game').directive('wildBlockNormal', [
    function() {
        return {
            templateUrl: 'game/directives/block/normal/blockNormal.html',
            restrict: 'E',
            replace: false,
            transclude: true,
            scope: {},
            bindToController:{
                'letter': '@',
                'type': '@',
                'size': '@'
            },
            controller: 'BlockNormalController',
            controllerAs: 'vm'
        };
    }
]);