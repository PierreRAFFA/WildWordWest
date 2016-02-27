'use strict';

angular.module('game').directive('wildWeaponSelector', [
    function () {
        return {
            templateUrl: 'game/directives/weaponSelector/weaponSelector.html',
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
            controller: 'WeaponSelectorController',
            controllerAs: 'vm'
        };
    }
]);
