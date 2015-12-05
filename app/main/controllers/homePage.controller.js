'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function HomePageController($window, accountService, $cordovaDevice, Accounts, Locales)
{
    this.$window = $window;
    this.accountService = accountService;
    this.$cordovaDevice = $cordovaDevice;
    this.Accounts = Accounts;
    this.Locales = Locales;

    this.scores = [];
    this.account = null;

    this._init();
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////   INIT
HomePageController.prototype._init = function()
{
    this._identifyUser();
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  IDENTIFY USER
HomePageController.prototype._identifyUser = function()
{
    if ( this.$window.hasOwnProperty('cordova'))
    {
        var self = this;

        if (this.$window.ionic.Platform.isReady)
        {
            self._getUserInfo(self.$cordovaDevice.getUUID());
        } else {
            this.$window.ionic.Platform.ready( function()
            {
                self._getUserInfo(self.$cordovaDevice.getUUID());
            });
        }
    } else {
        //this._getUserInfo('PierreTest2');
        this._getUserInfo('unknown');
    }
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
HomePageController.$inject = ['$window', 'accountService', '$cordovaDevice', 'Accounts', 'Locales'];
angular.module('main').controller('HomePageController', HomePageController);
