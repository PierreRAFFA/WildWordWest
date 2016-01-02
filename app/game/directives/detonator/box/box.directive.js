'use strict';

angular.module('game').directive('wildBox', [
    function () {

        return {
            templateUrl: 'game/directives/detonator/box/box.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
                value: '='
            },
            controller: 'BoxController',
            controllerAs: 'vm',
            link: function(scope, element, attrs, BoxController) {

                //var vm = DetonatorController;
                scope.$watch('vm.value', function(value)
                {
                    if (value <= 600)
                    {
                        BoxController.startAnimate();
                    } else {
                        BoxController.stopAnimate();
                    }
                });
            }
        };
    }
]);
