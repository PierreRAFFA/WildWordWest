'use strict';

angular.module('game').directive('wildBoard', [
    function () {
        return {
            templateUrl: 'game/directives/board/board.html',
            restrict: 'E',
            replace: false,
            transclude: true,
            scope: {},
            bindToController: {
                'numColumns': '@',
                'numRows': '@',
                'locale': '@'
            },
            controller: 'BoardController',
            controllerAs: 'vm'
        };
    }
]);
