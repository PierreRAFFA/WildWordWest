'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function PlatformGameCenter($q, Accounts, $cordovaDevice, $window)
{
    var methods = {};

    methods.authenticate = function()
    {
        var deferred = $q.defer();

        var platform = $cordovaDevice.platform || 'iOS';
        platform = platform.toLowerCase();

        //possibly remove the switch if ios\android have similar methods
        switch(platform) {

            default:
            case "ios":
            case "Android":

                if ('gamecenter' in $window)
                {
                    gamecenter.auth(function (user)
                    {
                        _getUserAvatar(deferred, platform, user);

                    }, function (data) {
                        deferred.reject(data);
                    });
                }else{
                    angular.$log.warn('gamecenter can not exist in the browser. A default user has been created');
                    var fakeUser = {
                        playerID: 'fake2',
                        alias: 'P3',
                        displayName: 'Bruno Masure2'
                    };
                    _getUserAvatar(deferred, platform, fakeUser);
                }
                break;
        }

        return deferred.promise;
    };

    return methods;


    /**
     * Calls the gameCenter to get the player avatar, then call _getInternalAccount
     *
     * @param deferred
     * @param platform
     * @param user
     * @private
     */
    function _getUserAvatar(deferred, platform, user) {

        if ('gamecenter' in $window)
        {
            gamecenter.getPlayerImage(
                function(path) {
                    user.avatar = path;
                    _getInternalAccount(deferred, platform, user);
                }, function(data) {
                    user.avatar = '';
                    _getInternalAccount(deferred, platform, user);
                }
            );
        }else{
            user.avatar = 'main/assets/images/defaultAccountImage.png';
            _getInternalAccount(deferred, platform, user);
        }
    }

    /**
     * Returns all internal informations about the user in the promise
     *
     * @param deferred
     * @param platform IOS|Android
     * @param user  IOS\Android user model
     * @private
     */
    function _getInternalAccount(deferred, platform, user)
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
                account.avatar = user.avatar;

                //in case of new account
                if (account.hasOwnProperty('name') == false)
                    account.name = user.displayName;

                deferred.resolve(account);
            }, function(data)
            {
                deferred.reject(data);
            }
        );
    }
}


///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
PlatformGameCenter.$inject = ['$q', 'Accounts', '$cordovaDevice', '$window'];
angular.module('game').factory('PlatformGameCenter', PlatformGameCenter);
