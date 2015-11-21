'use strict';
angular.module('game').filter('toLevelName', function()
{
    return function(level) {

        var levelName = '';

        switch (level)
        {
            default:
            case 0:
                levelName = 'slow';
                break

            case 1:
                levelName = 'moderate';
                break

            case 2:
                levelName = 'fast';
                break;

            case 3:
                levelName = 'very fast';
                break;
        }

        return levelName;
    };
});
