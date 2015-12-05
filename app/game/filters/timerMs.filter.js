'use strict';
angular.module('game').filter('toHumanTimeMs', function()
{
    /**
     * Returns the time in human render
     *
     * @param time in ms
     * @return string
     */

    return function(time) {

        var humanTime = '';
        var milliseconds = Math.floor(time % 1000);
        var seconds = Math.floor( time / 1000 % 60);
        var minutes = Math.floor( time / (60 * 1000) % 60);

        if (minutes < 10)
        {
            minutes = '0' + minutes;
        }

        if (seconds < 10)
        {
            seconds = '0' + seconds;
        }

        //add 0 to the milliseconds
        while (milliseconds < 100)
        {
            milliseconds *= 10;
        }


        humanTime = minutes + '\'' + seconds + '<span class="ms"/>\'\'' + milliseconds + '</span>';

        return humanTime;
    };
});
