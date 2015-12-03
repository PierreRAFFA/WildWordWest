'use strict';

angular.module('game').directive('wildHighestWord', [
    function () {
        return {
            templateUrl: 'game/directives/highestWord/highestWord.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
                word: '@',
                points: '@',
            },
            controller: 'HighestWordController',
            controllerAs: 'vm'
        };
    }
]);
