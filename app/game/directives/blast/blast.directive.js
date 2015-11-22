'use strict';

angular.module('game').directive('wildBlast', [
    function () {
        return {
            templateUrl: 'game/directives/blast/blast.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
                size: '@',
                active: '=',
            },
            controller: 'BlastController',
            controllerAs: 'vm'
        };
    }
]);
