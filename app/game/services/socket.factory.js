'use strict';

(function (angular)
{
    angular.module('game').factory('socket', function (socketFactory) {

        var uri = window.location.protocol + "//" + window.location.hostname + ":" + 3000;
        console.log(uri);
        console.log(io);
        var myIoSocket = io.connect(uri);
        var socket = socketFactory({
            ioSocket: myIoSocket
        });

        return socket;
    })

})(angular);