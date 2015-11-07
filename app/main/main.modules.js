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
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('loadingPage', {
      url: '/',
      templateUrl: 'main/templates/loadingPage.html'
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
