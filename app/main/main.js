'use strict';
angular.module('main', [
    'ionic',
    'ui.router',
    'ngResource'
    // TODO: load other modules selected during generation
]).config(function ($stateProvider, $urlRouterProvider) {

    // ROUTING with ui.router
    $urlRouterProvider.otherwise('/');

    /**
     * This state contains the loading page and the balad (3s)
     */
    //$stateProvider
    //    .state('loadingPage', {
    //        url: '/',
    //        templateUrl: 'main/templates/loadingPage.html',
    //        controller: 'LoadingPageController as pc'
    //    });

    /**
     * This state contains the home with the rankings per language, the play button
     */
    $stateProvider
        .state('authentication', {
            url: '/',
            cache: false,
            templateUrl: 'main/templates/authenticationPage.html',
            controller: 'AuthenticationPageController as pc'
        });

    /**
     * This state contains the home with the rankings per language, the play button
     */
    $stateProvider
        .state('home', {
            cache: false,
            templateUrl: 'main/templates/homePage.html',
            controller: 'HomePageController as pc'
        });

    /**
     * This state contains the game
     */
    $stateProvider
        .state('game', {
            url: '/game',
            cache: false,
            templateUrl: 'main/templates/gamePage.html',
            controller: 'GamePageController as pc'
        });
});
