'use strict';
angular.module('main', [
    'ionic',
    'ngCordova',
    'ui.router',
    // TODO: load other modules selected during generation
])
    .config(function ($stateProvider, $urlRouterProvider) {

        // ROUTING with ui.router
        $urlRouterProvider.otherwise('/');

        /**
         * This state contains the loading page and the balad (3s)
         */
        $stateProvider
            .state('loadingPage', {
                url: '/',
                templateUrl: 'main/templates/loadingPage.html',
                controller: 'LoadingPageController as pc'
            });

        /**
         * This state contains the home with the rankings per language, the play button
         */
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'main/templates/homePage.html',
                controller: 'HomePageController as pc'
            });


        /**
         * This state contains the game
         */
        $stateProvider
            .state('game', {
                url: '/game',
                templateUrl: 'main/templates/gamePage.html',
                controller: 'GamePageController as pc'
            });


        //.state('main.list', {
        //  url: '/list',
        //  views: {
        //    'tab-list': {
        //      templateUrl: 'main/templates/loading.html',
        //      // controller: 'SomeCtrl as ctrl'
        //    }
        //  }
        //})
        //.state('main.listDetail', {
        //  url: '/list/detail',
        //  views: {
        //    'tab-list': {
        //      templateUrl: 'main/templates/list-detail.html',
        //      // controller: 'SomeCtrl as ctrl'
        //    }
        //  }
        //})
        //.state('main.debug', {
        //  url: '/debug',
        //  views: {
        //    'tab-debug': {
        //      templateUrl: 'main/templates/debug.html',
        //      controller: 'DebugCtrl as ctrl'
        //    }
        //  }
        //});
    });
