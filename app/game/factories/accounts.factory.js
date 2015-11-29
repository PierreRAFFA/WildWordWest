'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function Accounts($resource, Config)
{
    var methods = {};

    methods.get = function()
    {
        return $resource( Config.ENV.server_url + '/accounts/:uuid', {
        }, {
            update: {
                method: 'GET'
            }
        });
    };

    methods.getHighestTime = function()
    {
        return $resource( Config.ENV.server_url + '/accounts/:locale/highest/time', {
        }, {
            update: {
                method: 'GET'
            }
        });
    };

    return methods;
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
Accounts.$inject = ['$resource', 'Config'];
angular.module('game').factory('Accounts', Accounts);
