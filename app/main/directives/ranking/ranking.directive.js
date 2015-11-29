'use strict';

angular.module('main').directive('ranking', [
    function () {
        return {
            templateUrl: 'main/directives/ranking/ranking.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
                locale: '='
            },
            controller: 'RankingController',
            controllerAs: 'vm'
        };
    }
]);
