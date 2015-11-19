'use strict';

describe('module: game, directive: game', function () {

    // load the directive's module
    beforeEach(module('game'));
    // load all the templates to prevent unexpected $http requests from ui-router
    beforeEach(module('ngHtml2Js'));

    var element,
        $rootScope;

    beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_.$new();
    }));

    it('should display the game directive', inject(function ($compile) {
        element = angular.element('<wild-game></wild-game>');
        element = $compile(element)($rootScope);

        expect(element.length).toBe(1);
    }));


});
