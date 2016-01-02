'use strict';

describe('module: game, directive: countdown', function () {

    // load the directive's module
    beforeEach(module('game'));
    // load all the templates to prevent unexpected $http requests from ui-router
    beforeEach(module('ngHtml2Js'));

    var element,
        $rootScope;

    beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_.$new();
    }));

    it('should display the board directive', inject(function ($compile) {
        element = angular.element('<wild-board num-rows="9" num-columns="7" locale="fr_FR"></wild-board>');
        element = $compile(element)($rootScope);

        expect(element.length).toBe(1);
    }));


});
