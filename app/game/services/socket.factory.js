'use strict';

(function (angular) {
    angular.module('game').factory('socket', function (socketFactory) {

        var uri = window.location.protocol + '//' + window.location.hostname + ':' + 3001;
        uri = 'http://localhost:3000';
        uri = 'http://www.wildwordwest.com:3001';
        var myIoSocket = io.connect(uri);
        var socket = socketFactory({
            ioSocket: myIoSocket
        });

        return socket;
    })

})(angular);
