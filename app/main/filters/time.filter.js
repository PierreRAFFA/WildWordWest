'use strict';
angular.module('main').filter('time', function()
{
    return function(time) {

        var seconds = Math.round((time / 1000) % 60);
        var minute = Math.floor((time / (1000 * 60)) % 60);
        //var lHour = (time / (1000 * 60 * 60)) % 24;

        if ( minute < 10)
        {
            minute = '0' + minute;
        }
        if ( seconds < 10)
        {
            seconds = '0' + seconds;
        }

        return minute + '\'' + seconds;
    };
});
