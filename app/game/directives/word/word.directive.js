'use strict';

angular.module('game').directive('wildWord', [
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
            controllerAs: 'vm',
            link: function(scope, element, attrs, BoardController) {
                BoardController.init();
            }
        };
    }
]);
