'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function Accounts($resource, Config)
{
    var methods = {};

    methods.getByGameCenterId = function()
    {
        return $resource( Config.ENV.server_url + '/accounts/:platform/:gameCenterId', {
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
