'use strict';

angular.module('main').directive('navigation', [
    function () {
        return {
            templateUrl: 'main/directives/navigation/navigation.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
            },
            controller: 'NavigationController',
            controllerAs: 'vm'
        };
    }
]);
