'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function AuthenticationPageController($window, $state, accountService, PlatformGameCenter)
{
    this.$window = $window;
    this.$state = $state;
    this.accountService = accountService;
    this.PlatformGameCenter = PlatformGameCenter;

    var self = this;
    if (this.$window.ionic.Platform.isReady)
    {
        this._authenticate();
    } else {
        this.$window.ionic.Platform.ready( function()
        {
            self._authenticate();
        });
    }
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////   AUTHENTICATE
AuthenticationPageController.prototype._authenticate = function()
{
    var self = this;
    var promise = this.PlatformGameCenter.authenticate();
    promise.then(function(user)
    {
        self._updateAccount(user);
    }, function(data)
    {
        console.log(data);//@TODO error
    });
}
AuthenticationPageController.prototype._updateAccount = function(user)
{
    //update accountService
    angular.extend(this.accountService, user);

    //check the account and go to the proper state
    this.$state.go('home');

    //if (Object.keys(this.accountService.scores).length)
    //{
    //    this.$state.go('home');
    //}else{
    //    this.$state.go('newAccount');
    //}
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
AuthenticationPageController.$inject = ['$window', '$state', 'accountService', 'PlatformGameCenter'];
angular.module('main').controller('AuthenticationPageController', AuthenticationPageController);
