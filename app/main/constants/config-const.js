'use strict';
angular.module('main').constant('Config', {

    // gulp environment: injects environment vars
    // https://github.com/mwaylabs/generator-m-ionic#gulp-environment
    ENV: {
        /*inject-env*/
        'server_url': 'http://192.168.0.10:3000',
        'test': 'ok',
        'socketio': 'http://192.168.0.10:3000/socket.io/socket.io.js'
        /*endinject*/
    },

    // gulp build-vars: injects build vars
    // https://github.com/mwaylabs/generator-m-ionic#gulp-build-vars
    BUILD: {
        /*inject-build*/
        /*endinject*/
    }

});
