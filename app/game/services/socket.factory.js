'use strict';

(function (angular) {
    angular.module('game').factory('socket', function (socketFactory, GameConfig) {

        //var uri = window.location.protocol + '//' + window.location.hostname + ':' + 3001;
        //uri = 'http://localhost:3000';
        var uri = GameConfig.ENV.socketio;
        uri = 'http://localhost:3000';
        var myIoSocket = io.connect(uri);
        var socket = socketFactory({
            ioSocket: myIoSocket
        });

        return socket;
    })

})(angular);
