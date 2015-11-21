'use strict';

angular.module('game').directive('wildDetonator', [
    function () {
        console.log('okokok');

        return {
            templateUrl: 'game/directives/countdown/detonator/detonator.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
                value: '='
            },
            controller: 'DetonatorController',
            controllerAs: 'vm',
            link: function(scope, element, attrs, DetonatorController) {

                var vm = DetonatorController;
                scope.$watch('vm.value' , function(value) {
                    console.log(value);
                    if (value <= 600)
                        DetonatorController.startAnimate();
                    else
                        DetonatorController.stopAnimate();
                });
            }
        };
    }
]);
