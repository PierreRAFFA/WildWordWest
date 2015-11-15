'use strict';
angular.module('game', [
    'ionic',
    'ngCordova',
    'ui.router',
    'rt.eventemitter',
    'btford.socket-io',
    // TODO: load other modules selected during generation
]);
//    .config(function ($stateProvider) {
//
//    // ROUTING with ui.router
//    $stateProvider
//        // this state is placed in the <ion-nav-view> in the index.html
//        .state('game', {
//            url: '/game',
//            template: '<ion-view view-title="game"></ion-view>',
//            // templateUrl: 'game/templates/<someTemplate>.html',
//            // controller: 'SomeCtrl as ctrl'
//        });
//});
