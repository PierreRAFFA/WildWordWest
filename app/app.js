'use strict';
var app = angular.module('WildWordWest', [
    // load your modules here
    'main', // starting with the main module
    'game'
]);


app.run(function($log) {
    angular.$log = $log;
});

