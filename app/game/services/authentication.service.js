'use strict';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function AuthenticationService($q, $window)
{
    console.log('AuthenticationService');

    this.$q = $q;
    this.$window = $window;
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// AUTHENTICATE
/**
 * Authenticates the gamer ( from gameCenter and mongodb )
 * First, waits for cordova to be ready and then, calls the gamecenter authentication
 *
 * @returns {promise}
 */
AuthenticationService.prototype.authenticate = function()
{
    var self = this;
    var deferred = this.$q.defer();
    if (this.$window.ionic.Platform.isReady)
    {
        self._onCordovaReady(deferred);
    } else {
        this.$window.ionic.Platform.ready( function()
        {
            self._onCordovaReady(deferred);
        });
    }

    return deferred.promise;
};
AuthenticationService.prototype._onCordovaReady = function(deferred)
{
    this._authenticateToGameCenter(deferred);
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// AUTHENTICATE GAMECENTER
/**
 * Authenticates to the proper gameCenter depending on the platform.
 *
 * @returns {promise}
 */
AuthenticationService.prototype._authenticateToGameCenter = function(deferred)
{
    gamecenter.auth(function (user)
    {
        deferred.resolve(user);
    }, function (data) {
        deferred.reject(data);//@TODO error
    });
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  NEW GAME
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
AuthenticationService.$inject = ['$q', '$window'];
angular.module('game').service('gameCenterService', AuthenticationService);
