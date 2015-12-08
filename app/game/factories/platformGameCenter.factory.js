'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function PlatformGameCenter($q, Accounts, GameCenter)
{
    var methods = {};

    methods.authenticate = function()
    {
        var deferred = $q.defer();
        GameCenter.authenticate().then(
            function(user)
            {
                Accounts.getByUUID().get({uuid: user.playerID}).$promise.then(

                    function(account)
                    {
                        account.uuid = user.playerID;
                        account.name = user.alias;

                        deferred.resolve(account);
                    }, function(data)
                    {
                        deferred.reject(data);
                    });
            }, function(data)
            {
                deferred.reject(data)
            }
        );

        return deferred.promise;
    };

    return methods;
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
PlatformGameCenter.$inject = ['$q', 'Accounts', 'GameCenter'];
angular.module('game').factory('PlatformGameCenter', PlatformGameCenter);
