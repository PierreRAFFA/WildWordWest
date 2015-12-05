'use strict';

angular.module('game').directive('wildWeapon', [
    function () {
        return {
            templateUrl: 'game/directives/weapon/weapon.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
                type: '@',
                quantity: '@',
            },
            controller: 'WeaponController',
            controllerAs: 'vm'
        };
    }
]);
