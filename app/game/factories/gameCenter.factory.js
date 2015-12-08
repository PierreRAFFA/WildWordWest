'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function GameCenter($q, $window)
{
    var methods = {};

    methods.authenticate = function()
    {
        var deferred = $q.defer();

        if ('gamecenter' in $window)
        {
            gamecenter.auth(function (user)
            {
                deferred.resolve(user);
            }, function (data) {
                deferred.reject(data);
            });
        }else{
            angular.$log.warn('gamecenter is not defined. A default user has been returned !');
            deferred.resolve({
                playerID: 'G:8341890069-' +
                '',
                alias: 'P1-1',
                displayName: 'Pierre1'
            });
        }

        return deferred.promise;
    };

    return methods;
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
GameCenter.$inject = ['$q', '$window'];
angular.module('game').factory('GameCenter', GameCenter);
