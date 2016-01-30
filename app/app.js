'use strict';
var app = angular.module('WildWordWest', [
    // load your modules here
    'main', // starting with the main module
    'game'
]);

app.config(function($ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
});


app.run(function($log) {
    angular.$log = $log;
});

