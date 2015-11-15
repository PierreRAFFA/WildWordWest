'use strict';
angular.module('game').directive('testdir', function () {
    return {
        template: '<div></div>',
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
            element.text('this is the testdir directive', attrs);
        }
    };
});
