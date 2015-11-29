'use strict';

angular.module('main').directive('localeSelection', [
    function () {
        return {
            templateUrl: 'main/directives/localeSelection/localeSelection.html',
            restrict: 'E',
            replace: false,
            scope: {},
            bindToController: {
                locales: '=',
                selectedLocale: '='
            },
            controller: 'LocaleSelectionController',
            controllerAs: 'vm'
        };
    }
]);
