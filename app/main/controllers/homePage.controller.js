'use strict';
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////  CONSTRUCTOR
function HomePageController($window, $cordovaDevice, Scores)
{
    this.$window = $window;
    this.$cordovaDevice = $cordovaDevice;
    this.Scores = Scores;

    this.scores = [];

    this._init();
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////   INIT
HomePageController.prototype._init = function()
{
    this._identifyUser();
    this._displayRanking();
}
HomePageController.prototype._identifyUser = function()
{
    if ( window.hasOwnProperty('cordova'))
    {
        var self = this;

        if ( window.ionic.Platform.isReady )
        {
            alert(self.$cordovaDevice.getUUID());
        } else {
            this.$window.ionic.Platform.ready( function()
            {
                alert(self.$cordovaDevice.getUUID());
            });
        }

    }
}
HomePageController.prototype._displayRanking = function()
{
    console.log('_displayRanking');
    var self = this;
    var scores = this.Scores.getScore().query({locale: 'fr_FR', from: 0}, function() {

        self.scores = scores;

    });
}

///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// ANGULAR REGISTERING
HomePageController.$inject = ['$window', '$cordovaDevice', 'Scores'];
angular.module('main').controller('HomePageController', HomePageController);
