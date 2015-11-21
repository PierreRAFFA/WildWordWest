'use strict';

angular.module('game').directive('wildBestWord', [
    function () {
        return {
            templateUrl: 'game/directives/bestWord/bestWord.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
            },
            controller: 'BestWordController',
            controllerAs: 'vm'
        };
    }
]);
