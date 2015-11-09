'use strict';
var app = angular.module('wildwordwest', [
        'main',
        'game',
        'ngResource',
    ]
);

app.run(function($log) {
    angular.$log = $log;
});