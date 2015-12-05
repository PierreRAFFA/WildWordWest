'use strict';

angular.module('game').directive('wildWeaponList', [
    function () {
        return {
            templateUrl: 'game/directives/weaponList/weaponList.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
                numBombs: '@',
                numNitros: '@',
                numFreezes: '@',
                numBonusMultipliers: '@',
                numRecycles: '@',
            },
            controller: 'WeaponListController',
            controllerAs: 'vm'
        };
    }
]);
