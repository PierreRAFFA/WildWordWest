'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function HomePageController($window, accountService, $cordovaDevice, gameCenterService, Accounts, Locales)
{
    this.$window = $window;
    this.accountService = accountService;
    this.$cordovaDevice = $cordovaDevice;
    this.Accounts = Accounts;
    this.gameCenterService = gameCenterService;
    this.Locales = Locales;

    this.scores = [];
    this.account = null;

    this._init();
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////   INIT
HomePageController.prototype._init = function()
{

}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  IDENTIFY USER
HomePageController.prototype._identifyUser = function()
{

}
/**
 * Get user info
 * @param uuid
 * @private
 */
HomePageController.prototype._getUserInfo = function(uuid)
{
    var self = this;
    this.Accounts.get().get({uuid: uuid}, function(account)
    {
        self.accountService.uuid = uuid;

        if (account.uuid)
        {
            angular.extend(self.accountService, account);
        }

    }, function(error)
    {
        angular.$log.warn(error);
    });
}
///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
HomePageController.$inject = ['$window', 'accountService', '$cordovaDevice', 'gameCenterService', 'Accounts', 'Locales'];
angular.module('main').controller('HomePageController', HomePageController);
