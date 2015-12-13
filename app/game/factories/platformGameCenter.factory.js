'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function PlatformGameCenter($q, Accounts, IOSGameCenter, $cordovaDevice)
{
    var methods = {};


    methods.authenticate = function()
    {
        var deferred = $q.defer();

        var platform = $cordovaDevice.platform || 'iOS';
        platform = platform.toLowerCase();

        switch(platform) {

            default:
            case "ios":
                IOSGameCenter.authenticate().then(
                    function(user)
                    {
                        var params = {
                            platform: platform.toLowerCase(),
                            gameCenterId: user.playerID
                        };
                        Accounts.getByGameCenterId().get(params).$promise.then(

                            function(account)
                            {
                                account.platform = platform;
                                account.gameCenterId = user.playerID;
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
                break;

            case "Android":
                //@TODO
                break;
        }


        return deferred.promise;
    };

    return methods;
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
PlatformGameCenter.$inject = ['$q', 'Accounts', 'IOSGameCenter', '$cordovaDevice'];
angular.module('game').factory('PlatformGameCenter', PlatformGameCenter);
