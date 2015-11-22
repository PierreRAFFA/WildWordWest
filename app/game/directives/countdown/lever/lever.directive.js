'use strict';

angular.module('game').directive('wildLever', [
    function () {
        return {
            templateUrl: 'game/directives/countdown/lever/lever.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
                value: '='
            },
            controller: 'LeverController',
            controllerAs: 'vm',
            link: function(scope, element, attrs, LeverController) {

                scope.$watch('vm.value', function() {
                    LeverController.updateLever();
                });
            }
        };
    }
]);
